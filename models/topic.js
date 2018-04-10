const db = require('./config')

const TopicSchema = new db.Schema({
  topicPic: {
    type: String,
    required: true
  },
  topicName: {
    type: String,
    required: true
  }
})

const Topic = db.model('Topic',TopicSchema)

const add = ({topicPic,topicName}) => {
  return new Topic({
    topicPic,
    topicName
  })  
  .save()
  .then((result)=>{
    return result
  })
  .catch(() =>{
    return false
  })
}

const remove = (id) => {
  return Topic.findByIdAndRemove(id)
  .then((result) => {
    return result
  })
  .catch(() => {
    return false
  })
}

const findlist = ({count, start}) => {
  return Topic.find()
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
  remove,
  findlist
}