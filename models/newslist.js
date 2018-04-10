const mongoose = require('./config')

const NewslistSchema = new mongoose.Schema({
  showName: {
    type: String,
    required: true
  },
  showPic: {
    type: String,
    required: true
  },
  showTime: {
    type: String,
    required: true
  },
  showLocal: {
    type: String,
    required: true
  },
  showPrice: {
    type: String,
    required: true
  },
  showStates:{
    type:String,
    required:true
  },
  showTips:{
    type:String,
    required:true
  }
})

const Newslist = mongoose.model('Newslist',NewslistSchema)

const add = ({showName,showPic,showTime,showLocal,showPrice,showStates,showTips}) => {
  // console.dir({showName,showPic,showTime,showLocal,showPrice})
	return new Newslist({
      showName,
      showPic,
      showTime,
      showLocal,
      showPrice,
      showStates,
      showTips
  })
    .save()
    .then((result) => {
      return result
    })
    .catch((err) => {
      return false
    })
}

const list = ({limit,skip,cb}) => {
  Newslist.find()
  .limit(limit)
  .skip(skip)
  .sort({_id:-1})
  .then((result) => {
    cb(result)
  })
  .catch((err) => {
    cb(false)
  })
}

const findAll = () => {
  return Newslist.find()
  .then((result) => {
    return result
  })
  .catch(() => {
    return false
  })
}


const findOne = (id) => {
  return Newslist.findById(id)
  .then((result) => {
    return result
  })
  .catch(() => {
    return false
  })
}

const update = ({id,showName,showPic,showTime,showLocal,showPrice,showStates,showTips}) =>{
  const update = showPic ? {
    showName,showPic,showTime,showLocal,showPrice,showStates,showTips
  } : {
    showName,showTime,showLocal,showPrice,showStates,showTips
  }
  return Newslist.findByIdAndUpdate(id,update)
  .then(()=>{
    return true
  })
  .catch(()=>{
    return false
  })
}

const remove = (id) => {
  return Newslist.findByIdAndRemove(id)
  .then(() =>{
    return true
  })
  .catch(()=>{
    return false
  })
}

const search = (keywords) => {
  let reg = new RegExp(keywords,'i')
  return Newslist.find({
    '$or':[
      {'showName':{$regex:reg} },
      {'showTime':{$regex:reg} },
      {'showLocal':{$regex:reg} },
      {'showPrice':{$regex:reg} },
      {'showStates':{$regex:reg} }    
    ]
  })
  .then((result) => {
    return result
  })
  .catch(() => {
    return false
  })
}

const findlist = ({count, start}) => {
  return Newslist.find()
    .limit(count)
    .skip(start)
    // .sort({_id:-1})
    .then((result) => {
      return result
    })
    .catch(() => {
      return false
    })
}

module.exports = {
  add,
  list,
  findAll,
  findOne,
  update,
  remove,
  search,
  findlist
}