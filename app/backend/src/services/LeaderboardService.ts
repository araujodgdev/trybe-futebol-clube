import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';
import ILeaderBoard from '../Interfaces/ILeaderBoard';

type Filter = 'homeTeamId' | 'awayTeamId';

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamModel(),
    private matchModel = new MatchModel(),
  ) {}

  public async generateLeaderboard(filter: Filter): Promise<ILeaderBoard[]> {
    const leaderboard = (await this.teamModel.findAll()).map(async (team) => {
      const matches = (await this.matchModel.findInProgress({ inProgress: false }))
        .filter((match) => match[filter] === team.id);

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

  public async getLeaderboard(filter: Filter): Promise<ILeaderBoard[]> {
    const leaderboard = await this.generateLeaderboard(filter);
    const aditionalInfo = leaderboard.map((team) => {
      const goalsBalance = team.goalsFavor - team.goalsOwn;
      const efficiency = ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);

      return {
        ...team,
        goalsBalance,
        efficiency: Number(efficiency),
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

  public async getSortedLeaderboard(filter: Filter): Promise<ServiceResponse<ILeaderBoard[]>> {
    const leaderboard = await this.getLeaderboard(filter);

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
