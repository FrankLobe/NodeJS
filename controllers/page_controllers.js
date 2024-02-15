import mongodb from 'mongodb';

const mongodbUrl = 'mongodb://localhost:27017/my_resume';
const mongodbName = 'my_resume';

class Contact {
    constructor(contact) {
        this.city = contact.city;
        this.company_address = contact.company_address;
        this.company_name = contact.company_name;
        this.company_website = contact.company_website;
        this.country = contact.country;
        this.email_address = contact.email_address;
        this.first_name = contact.first_name;
        this.job_posting = contact.job_posting;
        this.job_type = contact.job_type;
        this.last_name = contact.last_name;
        this.online_profile = contact.online_profile;
        this.position_title = contact.position_title;
        this.postal_code = contact.postal_code;
        this.province = contact.province;
        this.telephone_number =  contact.telephone_number;
        this.title = contact.title;
    }
}

const getMenuActive = menuItem => {
    const menuActive = new Array(7).fill('');
    menuActive[menuItem] = 'active';
    return menuActive;
}

const menuItems = {
    'index': 0,
    'skill': 1,
    'employment': 2,
    'experience': 3,
    'certification': 4,
    'education': 5,
    'contact': 6
}

export const getCertifications = async (request, response) => {
    try {
        const mongoClient = await mongodb.MongoClient.connect(mongodbUrl);
        const contents = await mongoClient.db(mongodbName).collection('certification').find().toArray();
        response.render('certification', {
            page_title: contents[0].page_title,
            certification_content: contents[0].certification_content,
            menu_active: getMenuActive(menuItems.certification)
        });
        mongoClient.close();
    } catch (error) {
        console.log(error);
        response.render('error');
    }
}

export const getContact = (request, response) => {
    
    const contactData = {
        city: "",
        company_address: "",
        company_name: "",
        company_website: "",
        country: "",
        email_address: "",
        first_name: "",
        job_posting: "",
        job_type: "",
        last_name: "",
        online_profile: "",
        position_title: "",
        postal_code: "",
        province: "",
        telephone_number: "",
        title: ""
    };
    
    const errorMessages = [];

    response.render('contact', {
        page_title: 'Frank Lobe - Contact',
        menu_active: getMenuActive(menuItems.contact),
        contact: contactData,
        error_messages: errorMessages,
        csrfToken: request.csrfToken()
    });
}

export const postContact = async (request, response) => {
    const contactData = new Contact(request.body);
    const errorMessages = [];

    let hasError = false;

    if (contactData.first_name === '') {
        hasError = true;
        errorMessages.push('First name  is a required value.');
    };

    if (contactData.company_name === '') {
        hasError = true;
        errorMessages.push('Company name is a required value.');
    };

    if (contactData.email_address === '' || contactData.telephone_number === '') {
        hasError = true;
        errorMessages.push('Email address or telephone number is a required value.');
    };

    if (hasError) {
        response.render('contact', {
            page_title: 'Frank Lobe - Contact',
            menu_active: getMenuActive(menuItems.contact),
            contact: contactData,
            error_messages: errorMessages
        });
    } else {
        try {
            const mongoClient = await mongodb.MongoClient.connect(mongodbUrl);
            const db = mongoClient.db(mongodbName);
            const result = await db.collection('contact').insertOne(contactData);

            mongoClient.close();

            request.session.contact = contactData;

            let resume = '';

            if (contactData.job_type == 'Progress OpenEdge 4GL/ABL Application Development') {
                resume = 'documents/FrankLobeOE.pdf';
            }
            else if (contactData.job_type == 'Machine Learning Engineering') {
                resume = 'documents/FrankLobeML.pdf';
            }
            else if (contactData.job_type == 'Website Development') {
                resume = 'documents/FrankLobeWD.pdf';
            }

            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            response.render('coverletter', {
                page_title: 'Frank Lobe - Cover Letter',
                menu_active: getMenuActive(menuItems.contact),
                date: formattedDate,
                resume: resume,
                contact: contactData
            });
        } catch (error) {
            console.log(error);
            response.render('error');
        }
    }
}

export const getCoverLetter = (request, response) => {

    if (request.session.contact) {

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        let resume = 'documents/FrankLobeOE.pdf';

        if (request.session.contact.job_type === 'Progress OpenEdge 4GL/ABL Application Development') {
            resume = 'documents/FrankLobeOE.pdf';
        }
        else if (request.session.contact.job_type === 'Machine Learning Engineering') {
            resume = 'documents/FrankLobeML.pdf';
        }
        else if (request.session.contact.job_type === 'Website Development') {
            resume = 'documents/FrankLobeWD.pdf';
        }

        response.render('coverletter', {
            page_title: 'Frank Lobe - Cover letter',
            menu_active: getMenuActive(menuItems.contact),
            date: formattedDate,
            resume: resume,
            contact: request.session.contact
        });
    } else {
        response.redirect('contact');
    }
}

export const getEducation = async (request, response) => {
    try {
        const mongoClient = await mongodb.MongoClient.connect(mongodbUrl);
        const contents = await mongoClient.db(mongodbName).collection('education').find().toArray();
        response.render('education', {
            page_title: contents[0].page_title,
            education_content: contents[0].education_content,
            menu_active: getMenuActive(menuItems.education)
        });
        mongoClient.close();
    } catch (error) {
        console.log(error);
        response.render('error');
    }
}

export const getEmployment = async (request, response) => {
    try {
        const mongoClient = await mongodb.MongoClient.connect(mongodbUrl);
        const contents = await mongoClient.db(mongodbName).collection('employment').find().toArray();
        response.render('employment', {
            page_title: contents[0].page_title,
            employment_content: contents[0].employment_content,
            menu_active: getMenuActive(menuItems.employment)
        });
        mongoClient.close();
    } catch (error) {
        console.log(error);
        response.render('error');
    }
}

export const getError = (request, response) => {
    response.render('error', {
        page_title: 'Frank Lobe - Error'
    });
}

export const getExperience = async (request, response) => {
    try {
        const mongoClient = await mongodb.MongoClient.connect(mongodbUrl);
        const contents = await mongoClient.db(mongodbName).collection('experience').find().toArray();
        response.render('experience', {
            page_title: contents[0].page_title,
            experience_content: contents[0].experience_content,
            menu_active: getMenuActive(menuItems.experience)
        });
        mongoClient.close();
    } catch (error) {
        console.log(error);
        response.render('error');
    }
}

export const getHome = async (request, response) => {
    try {
        const mongoClient = await mongodb.MongoClient.connect(mongodbUrl);
        const contents = await mongoClient.db(mongodbName).collection('home').find().toArray();
        response.render('index', {
            page_title: contents[0].page_title,
            page_content: contents[0].page_content,
            menu_active: getMenuActive(menuItems.index)
        });
        mongoClient.close();
    } catch (error) {
        console.log(error);
        response.render('error');
    }
}

export const getSkill = async (request, response) => {
    
    let jobType = 'All';

    if (request.session && request.session.contact) {
        jobType = request.session.contact.job_type;
    }
    
    try {
        const mongoClient = await mongodb.MongoClient.connect(mongodbUrl);
        const contents = await mongoClient.db(mongodbName).collection('skill').find().toArray();
        response.render('skill', {
            page_title: contents[0].page_title,
            skill_content: contents[0][jobType],
            menu_active: getMenuActive(menuItems.skill)
        });
        mongoClient.close();
    } catch (error) {
        console.log(error);
        response.render('error');
    }
}
