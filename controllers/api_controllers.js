import mongodb from 'mongodb';

const mongodbUrl = 'mongodb://localhost:27017/my_resume';
const mongodbName = 'my_resume';

export const getCertifications = async (request, response) => {
    try {
        const mongoClient = await mongodb.MongoClient.connect(mongodbUrl);
        const contents = await mongoClient.db(mongodbName).collection('certification').find().toArray();
        response.status(200).json(contents[0]);
        mongoClient.close();
    } catch (error) {
        console.log(error);
    }
}

export const getEducation = async (request, response) => {
    try {
        const mongoClient = await mongodb.MongoClient.connect(mongodbUrl);
        const contents = await mongoClient.db(mongodbName).collection('education').find().toArray();
        response.status(200).json(contents[0]);
        mongoClient.close();
    } catch (error) {
        console.log(error);
    }
}

export const getEmployment = async (request, response) => {
    try {
        const mongoClient = await mongodb.MongoClient.connect(mongodbUrl);
        const contents = await mongoClient.db(mongodbName).collection('employment').find().toArray();
        response.status(200).json(contents[0]);
        mongoClient.close();
    } catch (error) {
        console.log(error);
    }
}

export const getExperience = async (request, response) => {
    try {
        const mongoClient = await mongodb.MongoClient.connect(mongodbUrl);
        const contents = await mongoClient.db(mongodbName).collection('experience').find().toArray();
        response.status(200).json(contents[0]);
        mongoClient.close();
    } catch (error) {
        console.log(error);
    }
}

export const getSkill = async (request, response) => {
    try {
        const mongoClient = await mongodb.MongoClient.connect(mongodbUrl);
        const contents = await mongoClient.db(mongodbName).collection('skill').find().toArray();
        response.status(200).json(contents[0]);
        mongoClient.close();
    } catch (error) {
        console.log(error);
    }
}

export const getHome = async (request, response) => {
    try {
        const mongoClient = await mongodb.MongoClient.connect(mongodbUrl);
        const contents = await mongoClient.db(mongodbName).collection('home').find().toArray();
        response.status(200).json(contents[0]);
        mongoClient.close();
    } catch (error) {
        console.log(error);
    }
}
