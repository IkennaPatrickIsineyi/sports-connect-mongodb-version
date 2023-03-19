//models/dm.model.js

require('dotenv/config');

//Name of database
const dbName = (process.env.NODE_ENV === 'production') ? 'sportsConnect' : 'testdb';

//import connection
const mongo = require('./mongoConfig.js');
const db = mongo.db(dbName);
/* db.collection('user').drop(); 
db.collection('emailHash').drop();  */
console.log('Mongodb connection imported')

/* //Collections// 

User collection ::=>
email: pk,string;
password: string;
phone: string, unique;
username: string, unique;
profile_picture: string;
interest:[];
email_verified: boolean, default(false);
email_hash:string;

EmailHash collection ::=>
email: string
hash: string
 
 */


///Useful values returned by queries///
/* 
insert: insertedCount,insertedIds:{};
delete:deletedCount;
update: modifiedCount;
find:[]
findone:{} or null
*/

//create indexes//
//User collection indexing
//email field
db.collection('user').createIndex({ email: 1 }, { unique: true });
//username field
db.collection('user').createIndex({ username: 1 }, { unique: true });
//phone field
db.collection('user').createIndex({ phone: 1 }, { unique: true });


//query database//

//test CRUD queries
exports.testDb = (type, successCallback, errorCallback) => {
    if (type === 'register1') {
        const interest = ['swimming', 'soccer', 'running', 'tennis'];
        const data = {
            username: 'ikp', email: 'ikp@ikp', phone: '5785785785',
            password: '123', profile_prcture: 'daa.ksd', email_verified: false
        };
        const wildCards = [1, 2, 3, 4, 5, 6, 7, 8];
        db.collection('user').insertMany(wildCards.map(item => {
            return {
                username: data.username.toString() + item,
                email: data.email.toString() + item,
                phone: data.phone.toString() + item,
                password: data.password.toString() + item,
                profile_prcture: data.profile_prcture.toString() + item,
                email_verified: Boolean(data.email_verified),
                interest: Array.from(interest)
            }
        })).then(successCallback, errorCallback);
    }
    else if (type === 'register2') {
        const interest = ['swimming', 'soccer'];
        const data = {
            username: 'ikp', email: 'ikp@ikp', phone: '5785785785',
            password: '123', profile_prcture: 'daa.ksd', email_verified: false
        };
        const wildCards = [11, 21, 31, 41, 51, 61, 71, 81];
        db.collection('user').insertMany(wildCards.map(item => {
            return {
                username: data.username.toString() + item,
                email: data.email.toString() + item,
                phone: data.phone.toString() + item,
                password: data.password.toString() + item,
                profile_prcture: data.profile_prcture.toString() + item,
                email_verified: Boolean(data.email_verified),
                interest: Array.from(interest)
            }
        })).then(successCallback, errorCallback);
    }
    else if (type === 'register3') {
        const interest = ['rocking', 'dancing'];
        const data = {
            username: 'ikp', email: 'ikp@ikp', phone: '5785785785',
            password: '123', profile_prcture: 'daa.ksd', email_verified: false
        };
        const wildCards = [111, 211, 311, 411, 511, 611, 711, 811];
        db.collection('user').insertMany(wildCards.map(item => {
            return {
                username: data.username.toString() + item,
                email: data.email.toString() + item,
                phone: data.phone.toString() + item,
                password: data.password.toString() + item,
                profile_prcture: data.profile_prcture.toString() + item,
                email_verified: Boolean(data.email_verified),
                interest: Array.from(interest)
            }
        })).then(successCallback, errorCallback);
    }
    else if (type === 'register4') {
        const interest = ['swimming', 'soccer'];
        const data = {
            username: 'ikp', email: 'ikp@ikp', phone: '5785785785',
            password: '123', profile_prcture: 'daa.ksd', email_verified: false
        };
        const wildCards = [121, 212, 312, 412, 512, 612, 712, 812];
        db.collection('user').insertMany(wildCards.map(item => {
            return {
                username: data.username.toString() + item,
                email: data.email.toString() + item,
                phone: data.phone.toString() + item,
                password: data.password.toString() + item,
                profile_prcture: data.profile_prcture.toString() + item,
                email_verified: Boolean(data.email_verified),
                interest: Array.from(interest)
            }
        })).then(successCallback, errorCallback);
    }
    else if (type === 'find') {
        const userId = 'ikp@ikp812'

        db.collection('user').findOne({ $or: [{ email: userId }, { phone: userId }] },
            { projection: { interest: 1, _id: 0 } }).then((result) => {
                db.collection('user').find({
                    interest: { $elemMatch: { $in: result.interest } },
                    email: { $ne: userId }, phone: { $ne: userId }
                }, { projection: { username: 1, interest: 1, _id: 0 } }).toArray().then(successCallback, errorCallback)
            }, errorCallback)
    }
    else if (type === 'findall') {
        db.collection('user').find().toArray().then(successCallback, errorCallback);
    }
};

//get stored password hash of user: for authentication 
exports.getPasswordHash = (user, successCallback, errorCallback) => {
    db.collection('user').findOne({ email: user },
        { projection: { password: 1, username: 1, email_verified: 1 } }).then(successCallback, errorCallback);
};


//Query usertb for data
exports.validate = (column, value, successCallback, errorCallback) => {
    db.collection('user').findOne({ [column]: value },
        { username: 1 }).then(successCallback, errorCallback);
};

//register a user
exports.register = (username, email, password, phone,
    interestList, successCallback, errorCallback) => {
    db.collection('user').insertOne({
        username: username.toString(),
        email: email.toString(),
        password: password.toString(),
        phone: phone.toString(),
        interest: Array.from(interestList)
    }).then(successCallback, errorCallback);
};

exports.findLikeMinds = (userId, successCallback, errorCallback) => {
    //first grab the interest of the interest of this user
    db.collection('user').findOne({ $or: [{ email: userId }, { phone: userId }] },
        { projection: { interest: 1, _id: 0 } }).then((result) => {
            console.log(result.interest)
            //then use those interest to find OTHER users who have any of those interest
            db.collection('user').find({
                interest: { $elemMatch: { $in: result.interest } },
                email: { $ne: userId }, phone: { $ne: userId }
            }, { projection: { username: 1, interest: 1, _id: 0 } }).toArray().then(successCallback, errorCallback)
        }, errorCallback)
};

//get user's username and email verification status
exports.getUserIdentity = (userId, successCallback, errorCallback) => {
    db.collection('user').findOne({ $or: [{ email: userId }, { phone: userId }] },
        { projection: { username: 1, email_verified: 1 } }).then(successCallback, errorCallback);
};

//Save the hash send to a user's email
exports.saveEmailVerificationHash = (hash, email, successCallback, errorCallback) => {
    db.collection('emailHash').insertOne({
        $set: {
            hash: hash,
            email: email
        }
    }).then(successCallback, errorCallback);
};

//Save the hash send to a user's email
exports.verifyEmail = (hash, successCallback, errorCallback) => {
    db.collection('emailHash').deleteMany({ hash: hash }).then(successCallback, errorCallback);
};

//Set email verified to true.
//First grab the email associated with this hash
exports.updateEmailVerified = (hash, successCallback, errorCallback) => {
    db.collection('emailHash').find({ hash: hash },
        { projection: { email: 1, _id: 0 } }).toArray().then((hashArr) => {
            //Then use that email to find the user's record and 
            //set email verified to true.
            db.collection('user').updateOne({ email: { $in: hashArr.map(hashObj => hashObj.email) } },
                { $set: { email_verified: true } }).then(successCallback, errorCallback)
        }, errorCallback);
};

//change password
exports.changePassword = (newPassword, email, successCallback, errorCallback) => {
    db.collection('user').updateOne({ email: email },
        { $set: { password: newPassword } }).then(successCallback, errorCallback);
};

//update password of already logged in user
exports.updatePassword = (newPassword, user, successCallback, errorCallback) => {
    db.collection('user').updateOne({ $or: [{ email: user }, { phone: user }] },
        { $set: { password: newPassword } }).then(successCallback, errorCallback);
};

//get email of this user for editing
exports.getEmail = (user, successCallback, errorCallback) => {
    db.collection('user').findOne({
        $or: [{ email: user },
        { phone: user }]
    }, { projection: { email: 1 } }).then(successCallback, errorCallback);
};

//get username of this user for editing
exports.getUsername = (user, successCallback, errorCallback) => {
    db.collection('user').findOne({
        $or: [{ email: user },
        { phone: user }]
    }, { projection: { username: 1 } }).then(successCallback, errorCallback);
};

//update email of this user 
exports.updateEmail = (newEmail, user, successCallback, errorCallback) => {
    db.collection('user').updateOne({
        $or: [{ email: user },
        { phone: user }]
    }, { $set: { email: newEmail } }).then(successCallback, errorCallback);
};

//update username of this user  
exports.updateUsername = (newUsername, user, successCallback, errorCallback) => {
    db.collection('user').updateOne({ $or: [{ email: user }, { phone: user }] },
        { $set: { username: newUsername } }).then(successCallback, errorCallback);
};


//get details of this user
exports.getProfileData = (user, successCallback, errorCallback) => {
    db.collection('user').findOne({ $or: [{ email: user }, { phone: user }] },
        { projection: { email: 1, phone: 1, username: 1, profile_prcture: 1, interest: 1 } }).then(successCallback, errorCallback);
};


//get profile details of user
exports.getProfile = (username, successCallback, errorCallback) => {
    db.collection('user').findOne({ username: username },
        { projection: { username: 1, email: 1, phone: 1, profile_prcture: 1 } }).then(successCallback, errorCallback);
};