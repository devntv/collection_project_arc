import { useRef } from "react";
import { sleep } from "utilities/delay";
export const useAPIQueue = (api) => {
	const id = useRef(0);
	const queue = useRef({ 0: false });

	return {
		api: async (data) => {
			const currendID = id.current++;
			queue.current[currendID] = true;
			while (queue.current[currendID - 1]) {
				await sleep(0);
			}
			return new Promise((resolve, reject) => {
				api(data)
					.then((result) => {
						queue.current[currendID] = false;
						resolve(result);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		resetQueue: () => {
			id.current = 0;
			queue.current = {};
		},
	};
};
