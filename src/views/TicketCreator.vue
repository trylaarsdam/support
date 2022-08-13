<template>
  <div v-if="!this.loading">
    <h1>New Ticket</h1>
    <p>
      Please fill out this form as completely as possible so that we can solve
      your problem as fast as possible. If you have encountered an issue that
      could expose user information, or other sensitive info, please select
      priority "Critical". Please do not use this priority otherwise.
    </p>
    <vs-divider />
    <vs-row vs-justify="left" style="padding-top: 0rem">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="12"
        style="padding-bottom: 0.5rem"
      >
        <h3>Ticket Title</h3>
        <vs-input
          label-placeholder=""
          style="padding-right: 0rem; width: 100%"
          v-model="ticket.title"
        />
      </vs-col>
    </vs-row>
    <vs-row vs-justify="left" style="padding-top: 0rem">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="12"
        style="padding-bottom: 0.5rem"
      >
        <h3>Ticket Priority</h3>
      </vs-col>
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="left"
        vs-w="6"
        style="padding-bottom: 0.5rem"
      >
        <vs-select class="selectExample" label="" style="padding-right: 0rem; width: 100%" v-model="ticket.priority">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item, index) in priorities"
          />
        </vs-select>
      </vs-col>
    </vs-row>
    <h3>Description of Issue</h3>
    <editor
      api-key="jbjz28qxgvr1uezd23few1yj5p5i7wjhitnkrsylprkwohcn"
      v-model="ticket.description"
      :init="{
        height: 250,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
      }"
    />
    <vs-button style="margin-top: 1rem; width: 25%;" @click="createTicket">Create Ticket</vs-button>
  </div>
</template>

<script>
import { auth } from "@/functions/auth";
import Editor from "@tinymce/tinymce-vue";

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  name: "TicketCreator",
  components: {
    editor: Editor,
  },
  data() {
    return {
      authUser: auth.currentUser,
      user: this.$store.state.signedInUser,
      loading: true,
      ticket: {
        title: "",
        description: "",
        priority: "normal",
        tags: [],
      },
      priorities: [
        { value: "critical", text: "Critical" },
        { value: "urgent", text: "Urgent" },
        { value: "normal", text: "Normal" },
        { value: "backlog", text: "Backlog" },
      ],
    };
  },
  async mounted() {
    this.$vs.loading();
    await delay(500);
    if (auth.currentUser != null) {
      this.authUser = auth.currentUser;
      this.loading = false;
      this.$vs.loading.close();
    } else {
      this.$vs.loading.close();
      this.$router.push("/login?redirect=/new");
    }
  },
};
</script>
