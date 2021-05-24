const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const userSchema = new Schema(
  {
    //username: string unique required trimmed
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    //email: string required unique must match valid email
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },
    //thoughts: id values matching thoughts
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    // friends
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', userSchema);

module.exports = User;