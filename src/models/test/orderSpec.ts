import { OrderStore, Order} from '../order';
import { UserStore } from '../user';

const userStore = new UserStore(); 
const store = new OrderStore();
let order: Order;

	describe('Order models', () => {
		beforeAll(async () => {
            const user = await userStore.create('Alina', 'Böhm', 'Leander')
            order = await store.createOrder(String(user.id), 'active');

		});

		it('Checks if Order was created successfully', () => {
              expect(order.order_status).toEqual('active');
		});
		it('Checks if index returns Orders', async () => {
            const orders = await store.index();
            expect(orders.length).not.toEqual(0);
		});
		it('returns a Product', async () => {
            const product = await store.addProduct(String(order.id), '1', 1);
            expect( typeof product === 'object' ).toEqual(true);
		});
	});

	