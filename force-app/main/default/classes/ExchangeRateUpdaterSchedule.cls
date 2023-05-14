global class ExchangeRateUpdaterSchedule implements Schedulable {
  global void execute(SchedulableContext sc) {
    ExchangeRateUpdater.updateExchangeRate();
  }
}
