//models/dm.model.js

require('dotenv/config');

//Name of database
const dbName = (process.env.NODE_ENV === 'production') ? 'sportsConnect' : 'testdb';

//import connection
const mongo = require('./mongoConfig.js');
const db = mongo.db(dbName);
db.collection('user').drop();
db.collection('interest').drop();
console.log('Mongodb connection imported')

/* //Collections//
**
User collection ::=>
email: pk,string;
password: string;
phone: string, unique;
username: string, unique;
profile_picture: string;
email_verified: boolean, default(false);

**
Interest collection ::=>
id: pk, Integer;
interest: string;
email: string, fk(User(email));

**
email hash collection ::=>
hash: string;
email: pk,string;

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

//Interest collection indexing
//Email and interest must not be the same for any two records
db.collection('interest').createIndex({ email: 1, interest: 1 }, { unique: true });

//EmailHash collection indexing
//Email and interest must not be the same for any two records
db.collection('emailHash').createIndex({ email: 1 }, { unique: true });

//query database//

//test CRUD queries
exports.testDb = (type, successCallback, errorCallback) => {
    if (type === 'insertmany') {
        db.collection('interest').insertMany([1, 2, 3, 4, 5, 6].map(item => {
            return { interest: `John1${item}`, email: item * 10 }
        })).then(successCallback, errorCallback);
    }
    else if (type === 'find') {
        db.collection('interest').find().toArray().then(successCallback, errorCallback);
    }
    else if (type === 'findone') {
        db.collection('interest').findOne({ email: 40 }).then(successCallback, errorCallback);
    }
    else if (type === 'delete') {
        db.collection('interest').deleteMany({ interest: 'John11' }).then(successCallback, errorCallback);
    }
    else if (type === 'update') {
        db.collection('interest').updateMany({ interest: 'John11' }, { $set: { email: 442 } }).then(successCallback, errorCallback);
    }
    else if (type === 'transaction') {
        interestList = ['sami1', 'dann', 'sol'];
        email = 'sam@sam.sam';
        const session = mongo.startSession();
        try {
            session.startTransaction();

            console.log('started');

            //insert personal data into user collection
            db.collection('user').insertOne({
                username: 'Sam', email: email,
                password: "gksy5yurhjsfjh", phone: '7578764764'
            }, { session }).then((insertId) => {
                console.log(1);
                //insert user's interests into interest collection
                db.collection('interest').insertMany(interestList.map((interest) => {
                    return { interest, email }
                }), { session }).then((result1) => {
                    //transaction succeeded
                    //commit transaction to database
                    session.commitTransaction().then((result2) => {
                        //commit succeeded
                        //end transaction session and return result
                        // and execution to controller
                        session.endSession();
                        successCallback(result1);
                    }, (error) => {
                        //commit failed
                        //end transaction session and return error
                        // and execution to controller
                        session.endSession();
                        errorCallback(error);
                    });
                }, (error) => {
                    //transaction failed
                    //hence rollback changes
                    session.abortTransaction().then(errorCallback);
                })
            })
        } catch (error) {
            //Catch any error or exceptions that occured.
            //Note that there are some exceptions or errors that it cannot catch
            console.log('transaction aborted');
            session.abortTransaction();
            errorCallback(error);
        }
    }
};

//get stored password hash of user: for authentication 
exports.getPasswordHash = (user, successCallback, errorCallback) => {
    db.collection('user').findOne({ email: user },
        { password: 1, username: 1, email_verified: 1 }).then(successCallback, errorCallback);
};

//save personal data of user
exports.savePersonalData = (username, email, password,
    phone, successCallback, errorCallback) => {
    db.collection('user').insertOne({
        username: username,
        email: email, password: password, phone: phone
    }).then(successCallback, errorCallback);
};

//Query usertb for data
exports.validate = (column, value, successCallback, errorCallback) => {
    db.collection('user').findOne({ [column]: value },
        { username: 1 }).toArray().then(successCallback, errorCallback);
};

//add new inventory
exports.register = (username, email, password, phone,
    interestList, successCallback, errorCallback) => {
    //create a client session
    const session = mongo.startSession();
    //Start transaction with this client session
    try {
        session.startTransaction();
        //insert personal data into user collection
        db.collection('user').insertOne({
            username: username, email: email,
            password: password, phone: phone
        }, { session }).then((insertId) => {
            //insert user's interests into interest collection
            db.collection('interest').insertMany(interestList.map((interest) => {
                return { interest, email }
            }), { session }).then((result1) => {
                //transaction succeeded
                //commit transaction to database
                session.commitTransaction().then((result2) => {
                    //commit succeeded
                    //end transaction session and return result
                    // and execution to controller
                    session.endSession();
                    successCallback(result1);
                }, (error) => {
                    //commit failed
                    //end transaction session and return error
                    // and execution to controller
                    session.endSession();
                    errorCallback(error);
                });
            }, (error) => {
                //transaction failed
                //hence rollback changes
                session.abortTransaction().then(errorCallback);
            })
        })
    } catch (error) {
        //Catch any error or exceptions that occured.
        //Note that there are some exceptions or errors that it cannot catch
        console.log('transaction aborted');
        session.abortTransaction();
        errorCallback(error);
    }
};

exports.findLikeMinds = (user, result) => {

    sql.all("select u.profile_picture, u.username, i.interest from \
	interesttb as i inner join usertb as u on i.email=u.email \
	where i.interest in (select interest from interesttb where email in \
	(select email from usertb where email=? or phone=?))\
	and u.email <> ? and u.phone<>?",
        [user, user, user, user], result);
};

//get user's username and email verification status
exports.getUserIdentity = (userId, successCallback, errorCallback) => {
    db.collection('user').findOne({ $or: [{ email: userId }, { phone: userId }] },
        { username: 1, email_verified: 1 }).then(successCallback, errorCallback);
};

//save interests of user
exports.saveInterests = (interestList, email, successCallback, errorCallback) => {
    db.collection('interest').insertMany(interestList.map(interest => {
        return { interest, email }
    })).then(successCallback, errorCallback);
};


//Save the hash send to a user's email
exports.saveEmailVerificationHash = (hash, email, successCallback, errorCallback) => {
    db.collection('emailHash').insertOne({ hash: hash, email: email }).then(successCallback, errorCallback);
};

//Save the hash send to a user's email
exports.verifyEmail = (hash, successCallback, errorCallback) => {
    db.collection('emailHash').deleteMany({ hash: hash }).then(successCallback, errorCallback);
};

//Set email verified to true
exports.updateEmailVerified = (hash, successCallback, errorCallback) => {
    db.collection('user').updateOne({
        email: {
            $in: $db.collection('emailHash').find({ hash: hash }, { email: 1, _id: 0 })
        }
    }, { $set: { email_verified: true } }).then(successCallback, errorCallback)
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
    }, { email: 1 }).then(successCallback, errorCallback);
};

//get username of this user for editing
exports.getUsername = (user, successCallback, errorCallback) => {
    db.collection('user').findOne({
        $or: [{ email: user },
        { phone: user }]
    }, { username: 1 }).then(successCallback, errorCallback);
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
        { email: 1, phone: 1, username: 1, profile_prcture: 1 }).then(successCallback, errorCallback);
};

//get interests of this user
exports.getInterests = (user, successCallback, errorCallback) => {
    db.collection('interest').find({
        email: {
            $in: $db.collection('user').find({
                $or: [{ email: user }, { phone: user }]
            }, { email: 1 })
        }
    }, { interest: 1 }).toArray().then(successCallback, errorCallback);
};

//get profile details of user
exports.getProfile = (email, successCallback, errorCallback) => {
    db.collection('user').findOne({ email: email },
        { username: 1, email: 1, phone: 1, profile_prcture: 1 }).then(successCallback, errorCallback);
};