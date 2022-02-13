import { UserStore, User } from '../user';

const store = new UserStore(); 

let user: User;

	describe('User models', () => {
		beforeAll(async () => {
             user = await store.create('Alina', 'Böhm', 'Leander')
		});

		it('Checks if User was created successfully', () => {
              expect(user.firstname).toEqual('Alina');
		});
		it('Checks if index returns Users', async () => {
            const users = await store.index();
            expect(users.length).not.toEqual(0);
		});
		it('returns a User', async () => {
            const testuser = await store.show(String(user.id));
            expect( testuser.firstname ).toEqual('Alina');
		});
        it('Authenticates users', async () => {
            const testuser = await store.authenticate('Alina', 'Böhm', 'Leander');
            expect( testuser ).not.toEqual(null);
		});
	});

	