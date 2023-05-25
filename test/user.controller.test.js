import { expect, assert } from 'chai';
import { createUserController, deleteUserController, getAllUsersController, getUserControllerByUsername } from '../controller/users.js';


describe('User controller MONGODB', () => {

        // it('should return array of users', async ()=> {
        //         const result = await getAllUsersController();
        //         console.log(result)
        //         expect(result).to.be.an('array');
        // }).timeout(5000);

        // it('should add a user', async () => {
        //         const user = {
        //                 username: 'carlos5',
        //                 password: '123',
        //                 email: 'carlos@mail.com ',
        //                 address: 'asad',
        //                 age: 22,
        //                 phoneNumber: 1122334455,
        //                 avatar: 'avatars picture',
        //         };
        //         console.log("🚀 ~ file: user.controller.test.js:23 ~ it ~ user:", user)
        //         const result = await createUserController(user);
        //         console.log("🚀 ~ file: user.controller.test.js:24 ~ it ~ result:", result)
                
        // });

        
        // it('should return user by username', async () => {
                
        //         const username = 'carlos5';
        //         const result = await getUserControllerByUsername(username);
        //         expect(result.username).to.be.equal(username);
        // }).timeout(5000);

        // it('should delete user by id', async () => {
        //         const username = 'carlos5';
        //         const user = await getUserControllerByUsername(username);
        //         const id = user._id;
                
        //         const usersBeforeDeletion = await getAllUsersController();
        //         console.log("🚀 ~ file: user.controller.test.js:42 ~ it ~ usersBeforeDeletion:", usersBeforeDeletion)
                
        //         await deleteUserController(id);
                
        //         const usersAfterDeletion = await getAllUsersController();
        //         console.log("🚀 ~ file: user.controller.test.js:47 ~ it ~ usersAfterDeletion:", usersAfterDeletion)

        //         expect(usersAfterDeletion.length).to.equal(usersBeforeDeletion.length - 1);
        //         });

});