import { ProductStore, Product} from '../product';

const store = new ProductStore();
let product: Product;

	describe('Product models', () => {
		beforeAll(async () => {
            const name = 'Test Product';
            const price = 20;
            const category = 'Test';

            product = await store.create(name, price, category);
		});

		it('Checks if Product was created successfully', () => {
              expect(product.name).toEqual('Test Product');
		});
		it('Checks if index returns Products', async () => {
            const products = await store.index();
            expect(products.length).not.toEqual(0);
		});
		it('returns a Product', async () => {
            const product = await store.show('1');
            expect(product.id).not.toEqual('1');
		});
	});

	