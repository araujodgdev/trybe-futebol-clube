const matches = [
  {
    home_team_id: 16,
    home_team_goals: 1,
    away_team_id: 8,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team_id: 9,
    home_team_goals: 1,
    away_team_id: 14,
    away_team_goals: 1,
    in_progress: true,
  },
];

const matchesInProgress = [
  {
    home_team_id: 9,
    home_team_goals: 1,
    away_team_id: 14,
    away_team_goals: 1,
    in_progress: true,
  },
];

const matchesFinished = [
  {
    home_team_id: 16,
    home_team_goals: 1,
    away_team_id: 8,
    away_team_goals: 1,
    in_progress: false,
  },
];

const newMatch = {
  homeTeamId: 1,
  homeTeamGoals: 1,
  awayTeamId: 2,
  awayTeamGoals: 1,
};

const createdMatch = {
  ...newMatch,
  id: 7,
  inProgress: true,
};

const newMatchWithEqualTeams = {
  homeTeamId: 1,
  homeTeamGoals: 1,
  awayTeamId: 1,
  awayTeamGoals: 1,
};

const newMatchWithNonexistentTeam = {
  homeTeamId: 1,
  homeTeamGoals: 1,
  awayTeamId: 100,
  awayTeamGoals: 1,
};

export {
  matches,
  matchesInProgress,
  matchesFinished,
  newMatch,
  createdMatch,
  newMatchWithEqualTeams,
  newMatchWithNonexistentTeam,
};
