import { DashboardModule } from './dashboard.module';

describe('DashboardModule', () => {
  let dashboardModule;

  beforeEach(() => {
    dashboardModule = new DashboardModule();
  });

  it('should create an instance', () => {
    expect(dashboardModule).toBeTruthy();
  })
});
