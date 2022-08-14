<template>
  <vs-card style="padding-bottom: 0rem">
    <div>
      <vs-row style="padding-bottom: 0.5rem" vs-align="center">
        <vs-col type="flex" vs-w="6">
          <vs-chip color="primary"> {{reply.userName}} </vs-chip>
        </vs-col>
        <vs-col type="flex" vs-w="6" vs-justify="right" vs-align="center">
          <p style="float: right">
            {{ moment(reply.createdAt) }}
          </p>
        </vs-col>
      </vs-row>
      <p v-html="reply.message" />
    </div>
  </vs-card>
</template>

<script>
const moment = require("moment");

export default {
  name: "ReplyCard",
  props: ["reply"],
  methods: {
    moment: function (date) {
      return moment(new Date(date * 1000)).format("MM-DD-YYYY, h:mm:ss a");
    },
  },
}
</script>
