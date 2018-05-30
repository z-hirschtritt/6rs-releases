// release-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const RepoSchema = new Schema({
    name: String,
    version: String,
  });

  const TicketSchema = new Schema({
    jiraId: String,
    jiraLink: String,
    type: String, // feature, fix, bug, etc.
    notes: String,
  });

  const ReleaseSchema = new Schema({
    number: {
      type: Number,
      unique: true,
    },
    appVersions: {
      type: [RepoSchema]
    },
    grmChanges: String,
    deploymentNotes: String,
    summary: String,
    tickets: {
      type: [TicketSchema]
    },
  }, {
    timestamps: true
  });

  return mongooseClient.model('release', ReleaseSchema);
};
