angular.module('sparrowFit')
.controller('TimedCtrl', function(httpService, store) {

   var token = store.get('id_token');
   var profile = store.get('profile');
   this.userId = store.get('profile')['user_id'];
   console.log('helow from TimedCtrl')
   console.log('profile', profile)
   console.log('userid', this.userId)
   console.log('Controller run');
   console.log('Token :',token);
  //data is the information send when a template is added.
  this.data= {};

  // this.userId = 'xyz';

  //workout contain template created by user.
  this.workout = [];

  //addWorkout() create a template of named workout
  this.addWorkout = function() {
    var obj = {};
    obj.activity = this.activity;
    obj.duration = Number(this.minutes || 0) * 60 + Number(this.seconds || 0);
    obj.sets = '';
    obj.reps = '';
    obj.break = Number(this.break || 0);
    this.workout.push(obj);
  };
  // `/api/workout/${token}`
  // `/api/workout/${this.userId}`
  //addTemplate add template to the database.
  this.sendTemplate = function() {
    this.createData();
    httpService.sendData('/api/workout', this.data);
    console.log('Send present workout to the database via http services',this.data);
  };

  this.createData  = function() {
    this.data.user_id = this.userId;
    this.data.workout = this.workout;
    this.data.templateName = this.templateName;
    this.data.timed = true;
  };
})
.component('timed', {
  controller: 'TimedCtrl',
  templateUrl: 'client/components/create-workout-component/timed/timed.html'
});
