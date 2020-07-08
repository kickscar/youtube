import mongoose from 'mongoose';
import mongo from '../config/mongo.js';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import Category from "../models/category.model.js"

mongoose.Promise = global.Promise;
chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;
chai.should();

describe('test: Model Category', function () {

    before(function () {
        /* before hook function */
    });

    it('connect to mongo mydb', function () {
        const { host, options } = mongo.config;
        return mongoose.connect(host, options).should.not.be.rejected;
    });

    it('Save Category', function () {
        const category = new Category({
            name: '여행',
            descripttions: '테스트입니다.'
        });
        return category.save().should.eventually.be.equal(category);
    });

    after(async function () {
        await mongoose.connection.dropCollection(Category.collection.collectionName);
        mongoose.connection.close();
    });
});