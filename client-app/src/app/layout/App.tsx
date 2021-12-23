import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import {Activity} from "../models/activity"
import Navbar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from "uuid";
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
   })
  }, [])

  if(loading) return <LoadingComponent content="loading app" />

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    //so if we select an activity, it will show the activity, If we click the create button (not pass an id) then it is going to clear it for us
    id ? handleSelectActivity(id) : handleCancelSelectActivity();

    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);

    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
    
  }

  return (
   <>
      <Navbar openForm={handleFormOpen}/>
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard activities={activities} selectedActivity={selectedActivity} selectActivity={handleSelectActivity} cancelSelectActivity={handleCancelSelectActivity} editMode={editMode} openForm={handleFormOpen} closeForm={handleFormClose} createOrEdit={handleCreateOrEditActivity} deleteActivity={handleDeleteActivity} submitting={submitting}/>
      </Container>
    </>
  );
}

export default App;
