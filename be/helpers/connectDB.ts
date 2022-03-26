import {connect} from 'mongoose'

connect('mongodb://localhost:27017/tutorial')
.then(() => {
    console.log('connected to DB');
})