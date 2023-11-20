import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';
import ILeaderBoard from '../Interfaces/ILeaderBoard';

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamModel(),
    private matchModel = new MatchModel(),
  ) {}

  public async generateLeaderboardHome(): Promise<ILeaderBoard[]> {
    const leaderboard = (await this.teamModel.findAll()).map(async (team) => {
      const matches = (await this.matchModel.findInProgress({ inProgress: false }))
        .filter((match) => match.homeTeamId === team.id);

      const wins = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
      const draws = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
      const losses = matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);

      return {
        name: team.teamName,
        totalPoints: wins.length * 3 + draws.length,
        totalGames: matches.length,
        totalVictories: wins.length,
        totalDraws: draws.length,
        totalLosses: losses.length,
        goalsFavor: matches.reduce((acc, match) => acc + match.homeTeamGoals, 0),
        goalsOwn: matches.reduce((acc, match) => acc + match.awayTeamGoals, 0),
      };
    });
    return Promise.all(leaderboard);
  }

  public async getLeaderboardHome(): Promise<ILeaderBoard[]> {
    const leaderboard = await this.generateLeaderboardHome();
    const aditionalInfo = leaderboard.map((team) => {
      const goalsBalance = team.goalsFavor - team.goalsOwn;
      const efficiency = (team.totalPoints / (team.totalGames * 3)) * 100;

      return {
        ...team,
        goalsBalance,
        efficiency,
      };
    });

    return aditionalInfo;
  }

  static sortByParam(param: string, leaderboard: ILeaderBoard[]): ILeaderBoard[] {
    const sortedLeaderboard = leaderboard.sort((a: any, b: any) => {
      if (a[param] > b[param]) return -1;
      if (a[param] < b[param]) return 1;
      return 0;
    });

    return sortedLeaderboard;
  }

  public async getSortedLeaderboardHome(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const leaderboard = await this.getLeaderboardHome();

    const goalsFavorSort = LeaderboardService.sortByParam('goalsFavor', leaderboard);

    const goalsBalanceSort = LeaderboardService.sortByParam('goalsBalance', goalsFavorSort);

    const totalWinsSort = LeaderboardService.sortByParam('totalVictories', goalsBalanceSort);

    const totalPointsSort = LeaderboardService.sortByParam('totalPoints', totalWinsSort);

    return {
      status: 'SUCCESSFUL',
      data: totalPointsSort,
    };
  }
}
