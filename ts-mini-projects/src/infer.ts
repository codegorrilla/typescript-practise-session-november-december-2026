type UnwrapBox<T> = T extends Promise<infer U> ? U : T;

type ApiPromise = Promise<{ orderId: number; status: string }>;

type OrderData = UnwrapBox<ApiPromise>; // { orderId: number; status: string }

function fetchUserSettings() {
	return;
}
