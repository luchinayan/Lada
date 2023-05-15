@isTest
private class ExchangeRateUpdaterScheduleTest {
  @isTest
  static void testExecute() {
    Test.startTest();
    ExchangeRateUpdaterSchedule schedule = new ExchangeRateUpdaterSchedule();
    schedule.execute(null);
    Test.stopTest();

    System.assertEquals(true, true, 'Add your assertions here');
  }
}
