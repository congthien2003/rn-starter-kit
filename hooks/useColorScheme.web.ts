/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
// Force light mode only for web
export function useColorScheme() {
	return "light" as const;
}
