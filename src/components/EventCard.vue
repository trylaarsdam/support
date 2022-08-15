<template>
  <vs-alert active="true" color="primary">
    <vs-row style="padding-bottom: 0rem" vs-align="center">
        <vs-col type="flex" vs-w="8">
          <p>
            {{ event }}
          </p>
        </vs-col>
        <vs-col type="flex" vs-w="4" vs-justify="right" vs-align="center">
          <p style="float: right">
            {{ moment(timestamp) }}
          </p>
        </vs-col>
      </vs-row>
  </vs-alert>
</template>

<script>
const moment = require("moment");

export default {
  name: "EventCard",
  props: ["timestamp", "event"],
  methods: {
    moment: function (date) {
      return moment(new Date(date * 1000)).format("MM-DD-YYYY, h:mm:ss a");
    },
  },
};
</script>
