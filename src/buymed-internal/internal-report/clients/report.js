import { APIClient } from "../lib/utils";
const URI_CHAT_REPORT = "/integration/crs/v1";

class ReportClient extends APIClient {
	constructor(ctx, data) {
		super(ctx, data);
	}

	getWaitTimeChartData(data){
		return this.call("POST", `${URI_CHAT_REPORT}/report/average-wait-to-process-time-topic-by-date`, data)
	}

	getNumberByDateChartData(data){
		return this.call("POST", `${URI_CHAT_REPORT}/report/number-topic-by-date`, data)
	}

	getNumberByCSChartData(data){
		return this.call("POST", `${URI_CHAT_REPORT}/report/number-topic-by-cs`, data)
	}

	getNumberByHourChartData(data){
		return this.call("POST", `${URI_CHAT_REPORT}/report/number-topic-by-hour`, data)
	}

	getCompletedTimeChartData(data){
		return this.call("POST", `${URI_CHAT_REPORT}/report/average-processing-time-topic-by-date`, data)
	}

	getLastUpdateReport(data){
		return this.call("POST", `${URI_CHAT_REPORT}/report/last-update`, data)
	}

	getRatingChartData(data) {
		return this.call("POST", `${URI_CHAT_REPORT}/report/number-rating-by-cs`, data)
	}

	getCountAverageRating(data) {
		return this.call("POST", `${URI_CHAT_REPORT}/report/get-count-and-average-rating`, data)
	}

	getCountAverageCompletedTopic(data) {
		return this.call("POST", `${URI_CHAT_REPORT}/report/get-count-and-average-completed-topic`, data)
	}

	getCountAverageProcessingTopic(data) {
		return this.call("POST", `${URI_CHAT_REPORT}/report/get-count-and-average-processing-topic`, data)
	}
	

	getNumberRatingByDate(data){
		return this.call("POST", `${URI_CHAT_REPORT}/report/number-rating-by-cs`, data)
	}

	getNumberByDateSellerWithSAChartData(data){
		return this.call("POST", `${URI_CHAT_REPORT}/report/seller-with-sa/number-topic-by-date`, data)
	}

	getWaitTimeSellerWithSAChartData(data){
		return this.call("POST", `${URI_CHAT_REPORT}/report/seller-with-sa/average-wait-to-process-time-topic-by-date`, data)
	}

	getRatingSellerWithSAChartData(data){
		return this.call("POST", `${URI_CHAT_REPORT}/report/seller-with-sa/number-rating-by-date`, data)
	}

	getCompletedTimeSellerWithSAChartData(data){
		return this.call("POST", `${URI_CHAT_REPORT}/report/seller-with-sa/average-processing-time-topic-by-date`, data)
	}

	getLastUpdateReportSellerWithSA(data){
		return this.call("POST", `${URI_CHAT_REPORT}/report/seller-with-sa/last-update`, data)
	}

	getCountAverageProcessingTopicSellerWithSA(data) {
		return this.call("POST", `${URI_CHAT_REPORT}/report/seller-with-sa/get-count-and-average-processing-topic`, data)
	}

	getCountAverageCompletedTopicSellerWithSA(data) {
		return this.call("POST", `${URI_CHAT_REPORT}/report/seller-with-sa/get-count-and-average-completed-topic`, data)
	}
}

export function getReportClient(ctx, data) {
	return new ReportClient(ctx, data);
}
