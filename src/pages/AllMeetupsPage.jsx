import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

export default function AllMeetupsPage() {
  const [loading, setLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState();

  useEffect(() => {
    const fetchMeetups = async () => {
      const response = await fetch(
        "https://react-meetup-app-a2eae-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json"
      );
      const data = await response.json();
      // converting an (object of objects) => (array of objects)
      const meetups = Object.keys(data).map((key) => {
        return { ...data[key], id: key };
      });
      setLoading(false);
      setLoadedMeetups(meetups);
    };
    fetchMeetups();
  }, []);

  return loading ? (
    <section>
      <p>Loading...</p>
    </section>
  ) : (
    <div>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </div>
  );
}
