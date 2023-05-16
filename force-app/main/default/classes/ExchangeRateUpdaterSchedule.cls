global class ExchangeRateUpdaterSchedule implements Schedulable {
  global void execute(SchedulableContext sc) {
    ExRateFetcher.updateExchangeRate();
  }
}
