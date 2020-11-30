const Repository = require('../models/Repository');
const CollectionFilter = require('../models/collectionFilter');
const { decomposePath } = require('../utilities');

module.exports = 
class WordController extends require('./Controller') {
    constructor(req, res){
        super(req, res, false /* needAuthorization */);
        this.wordRepository = new Repository('words', true /* cached */);
    }
    error(params, message){
        params["error"] = message;
        this.response.JSON(params);
        return false;
    }

    head() {
        console.log(this.wordRepository.ETag);
        this.response.JSON(null, this.wordRepository.ETag);
    }

    get(){
        let params = this.getQueryStringParams(); 
        let collectionFilter = new CollectionFilter(this.wordRepository.getAll(), params);
        this.response.JSON(collectionFilter.getPage(), this.wordRepository.ETag)
    }
}