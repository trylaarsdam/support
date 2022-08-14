<template>
  <div>
    <div v-if="!this.loading">
      <h1>Ticket | {{ ticket.title }}</h1>
      <vs-divider></vs-divider>
      <vs-row vs-justify="center" style="padding-top: 0.5rem">
        <vs-col
          type="flex"
          vs-justify="left"
          vs-align="left"
          vs-w="9"
          style="padding-right: 2rem"
        >
          <vs-row
            vs-justify="left"
            style="padding-top: 0rem"
            v-for="event in events"
            :key="event.id"
          >
            <ReplyCard
              v-if="event.type == 'message' || event.type== 'initialMessage'"
              :reply="{
                message: event.message,
                createdAt: event.createdAt._seconds,
                userName: event.userName,
              }"
            />
            <EventCard
              v-if="event.type == 'priorityChanged'"
              :event="'Priority changed to ' + event.priority + ' by ' + event.userName"
              :timestamp="event.createdAt._seconds"
            />
            <EventCard
              v-if="event.type == 'assignedTo'"
              :event="event.userName + ' assigned this ticket to ' + event.assigneeName"
              :timestamp="event.createdAt._seconds"
            />
          </vs-row>
          <!-- <vs-row vs-justify="left" style="padding-top: 0rem">
            <ReplyCard
              :reply="{
                message: 'Hello',
                createdAt: 1660356496,
                userID: 'Test author',
              }"
            />
          </vs-row>
          <vs-row vs-justify="left" style="padding-top: 0rem">
            <EventCard
              event="Priority changed to urgent"
              timestamp="1660356496"
            />
          </vs-row> -->
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="3"
          style="padding-top: 0rem"
        >
          <vs-row
            vs-justify="center"
            vs-align="center"
            style="padding-top: 0rem"
          >
            <vs-col type="flex" vs-w="12">
              <h3>Ticket Details</h3>
            </vs-col>
          </vs-row>
          <vs-row
            vs-justify="center"
            vs-align="center"
            style="padding-top: 0rem"
          >
            <vs-col type="flex" vs-w="12">
              <vs-divider />
            </vs-col>
          </vs-row>
          <vs-row
            vs-justify="center"
            vs-align="center"
            style="padding-top: 0rem"
          >
            <vs-col type="flex" vs-w="6">
              <p>Assignee:</p>
            </vs-col>
            <vs-col type="flex" vs-w="6" vs-justify="center" vs-align="center">
              <vs-chip v-if="ticket.assignedTo" color="primary">
                {{ ticket.assignedTo }}
              </vs-chip>
              <vs-chip v-else color="danger"> Unassigned </vs-chip>
            </vs-col>
          </vs-row>
          <vs-row
            vs-justify="center"
            vs-align="center"
            style="padding-top: 0rem"
          >
            <vs-col type="flex" vs-w="6">
              <p>Priority:</p>
            </vs-col>
            <vs-col type="flex" vs-w="6" vs-justify="center" vs-align="center">
              <vs-chip color="primary"> {{ ticket.priority }} </vs-chip>
            </vs-col>
          </vs-row>
          <vs-row
            vs-justify="left"
            vs-align="center"
            style="padding-top: 0.5rem"
          >
            <vs-col type="flex" vs-w="4">
              <p>Created At:</p>
            </vs-col>
            <vs-col type="flex" vs-w="8" vs-justify="left" vs-align="center">
              <p>
                {{ moment(ticket.createdAt._seconds) }}
              </p>
            </vs-col>
          </vs-row>
          <vs-row
            vs-justify="left"
            vs-align="center"
            style="padding-top: 0.75rem"
          >
            <vs-col type="flex" vs-w="4">
              <p>Updated At:</p>
            </vs-col>
            <vs-col type="flex" vs-w="8" vs-justify="left" vs-align="center">
              <p>
                {{ moment(ticket.updatedAt._seconds) }}
              </p>
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>
    </div>
    <div v-if="this.unauthorized">
      <h1>Unauthorized</h1>
      <vs-divider></vs-divider>
      <p>You do not have permission to view this ticket.</p>
    </div>
  </div>
</template>

<script>
import { auth } from "@/functions/auth";
const api = require("@/functions/api-requests.js");
const config = require("../../config.json");
const moment = require("moment");
import ReplyCard from "@/components/ReplyCard.vue";
import EventCard from "@/components/EventCard.vue";

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  name: "TicketViewer",
  components: {
    ReplyCard,
    EventCard,
  },
  methods: {
    moment: function (date) {
      return moment(new Date(date * 1000)).format("MM-DD-YYYY, h:mm:ss a");
    },
  },
  data() {
    return {
      authUser: auth.currentUser,
      user: this.$store.state.signedInUser,
      loading: true,
      unauthorized: false,
      ticket: {},
      events: [],
    };
  },
  async mounted() {
    this.$vs.loading();
    await delay(500);
    if (auth.currentUser != null) {
      this.authUser = auth.currentUser;

      await api.updateAPIAuth();
      let response = await api.axios.get(
        config["api-hostname"] + "/api/v1/tickets/" + this.$route.params.id
      );

      if (response.data.status == "success") {
        this.ticket = response.data.data.ticket;
        this.events = response.data.data.events;
        console.log("Ticket");
        console.log(this.ticket);
        console.log("Events");
        console.log(this.events);
        this.loading = false;
      } else {
        this.$vs.notify({
          title: "Error",
          text: response.data.message,
          color: "danger",
        });
      }

      this.loading = false;
      this.$vs.loading.close();
    } else {
      this.$vs.loading.close();
      this.$router.push("/login?redirect=/tickets/" + this.$route.params.id);
    }
  },
};
</script>
