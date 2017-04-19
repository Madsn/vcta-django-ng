import ScoreboardModule from './scoreboard.module';

describe('ScoreboardModule', () => {
  let scoreboardModule;

  beforeEach(() => {
    scoreboardModule = new ScoreboardModule();
  });

  it('should create an instance', () => {
    expect(scoreboardModule).toBeTruthy();
  })
});
