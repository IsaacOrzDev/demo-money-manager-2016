import mongoose from 'mongoose';
import dateformat from 'dateformat';

const DetailSchema = new mongoose.Schema({
    description: {type: String, required: true},
    amount: {type: Number, required: true}
}, {
    toJSON: {
        getters: true
    },
    toObject: {
        getters: true
    }
});
DetailSchema.path('amount').get((value) => {
    return (value / 100).toFixed(2);
});
DetailSchema.path('amount').set((value) => {
    return value * 100;
});
DetailSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v;
        ret.amount = (ret.amount / 100).toFixed();
        ret.id = ret._id.toString();
        delete ret._id;
    }
});

const TransactionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    account: {type: mongoose.Schema.Types.ObjectId, ref: "Account"},
    docDate: {type: Date, required: true},
    title: {type: String, required: true},
    type: {type: String, required: true},
    category: {type: String, required: true},
    amount: {type: Number, required: true},
    detail: [DetailSchema]
}, {
    toJSON: {
        getters: true
    },
    toObject: {
        getters: true
    }
});

TransactionSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v;
        delete ret.user;
        ret.amount = (ret.amount / 100).toFixed();
        ret.docDate = dateformat(ret.docDate, 'yyyy-mm-dd');
        ret.id = ret._id.toString();
        delete ret._id;
    }
});
TransactionSchema.path("amount").get((value) => {
    return (value / 100).toFixed(2);
});
TransactionSchema.path('amount').set((value) => {
    return value * 100;
});
TransactionSchema.path('docDate').get((value) => {
    return value? dateformat(value, 'yyyy-mm-dd') : '';
});
TransactionSchema.path('docDate').set((value) => {
    return new Date(value);
});

export default mongoose.model('Transaction', TransactionSchema);