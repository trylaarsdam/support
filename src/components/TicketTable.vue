<template>
  <vs-table
      :data="tickets" 
      pagination
      :max-items="perPage"
      search
    >
    <template slot="header">
      <h2>Your Tickets</h2>
    </template>
    <template slot="right">
      <vs-button @click="$router.push('/tickets/new')">New Ticket</vs-button>
    </template>
    <template slot="thead">
      <vs-th> Ticket # </vs-th>
      <vs-th> Title </vs-th>
      <vs-th> Assignee </vs-th>
      <vs-th> Last Updated </vs-th>
      <vs-th> </vs-th>
    </template>
    <template slot-scope="{ data }">
      <vs-tr
        :key="indextr"
        v-for="(tr, indextr) in tickets"
      >
        <vs-td :data="data[indextr].id">
          {{ data[indextr].id }}
        </vs-td>

        <vs-td :data="data[indextr].title">
          {{ data[indextr].title }}
        </vs-td>

        <vs-td :data="data[indextr].assignedTo">
          {{ data[indextr].assignedTo == undefined ? "Unassigned" : data[indextr].assignedTo }}
        </vs-td>

        <vs-td :data="data[indextr].updatedAt">
          {{ moment(data[indextr].updatedAt._seconds) }}
        </vs-td>

        <vs-td
          :data="data[indextr].id"
          style="position: relative; float: right"
        >
          <router-link :to="'/tickets/' + data[indextr].id">
            <vs-button color="primary" type="border">View</vs-button>
          </router-link>
        </vs-td>
      </vs-tr>
    </template>
  </vs-table>
</template>

<script>
const moment = require("moment");


export default {
  name: "TicketTable",
  props: {
    tickets: {
      type: Array,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    }
  },
  methods: {
    moment: function (date) {
      return moment(new Date(date * 1000)).format("MM-DD-YYYY, h:mm:ss a");
    },
  },
  mounted: () => {
    
  },
  data: () => ({
   
  }),
};
</script>
