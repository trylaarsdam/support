<template>
  <vs-table
      :data="users" 
      pagination
      max-items="8"
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
        v-for="(tr, indextr) in data"
      >
        <vs-td :data="data[indextr].id">
          {{ data[indextr].id }}
        </vs-td>

        <vs-td :data="data[indextr].title">
          {{ data[indextr].title }}
        </vs-td>

        <vs-td :data="data[indextr].id">
          {{ data[indextr].id }}
        </vs-td>

        <vs-td :data="data[indextr].updatedAt">
          {{ data[indextr].updatedAt }}
        </vs-td>

        <vs-td
          :data="data[indextr].id"
          style="position: relative; float: right"
        >
          <router-link :to="'/ticket/' + data[indextr].id">
            <vs-button color="primary" type="border">View</vs-button>
          </router-link>
        </vs-td>
      </vs-tr>
    </template>
  </vs-table>
</template>

<script>
export default {
  name: "TicketTable",
  mounted: () => {
    
  },
  data: () => ({
    users: [
      {
        id: 1,
        assignee: "Leanne Graham",
        title: "Bret",
        email: "Sincere@april.biz",
        updatedAt: "hildegard.org",
      },
      {
        id: 2,
        assignee: "Ervin Howell",
        title: "Antonette",
        email: "Shanna@melissa.tv",
        updatedAt: "anastasia.net",
      },
      {
        id: 3,
        assignee: "Clementine Bauch",
        title: "Samantha",
        email: "Nathan@yesenia.net",
        updatedAt: "ramiro.info",
      },
      {
        id: 4,
        assignee: "Patricia Lebsack",
        title: "Karianne",
        email: "Julianne.OConner@kory.org",
        updatedAt: "kale.biz",
      },
      {
        id: 5,
        assignee: "Chelsey Dietrich",
        title: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        updatedAt: "demarco.info",
      },
      {
        id: 6,
        assignee: "Mrs. Dennis Schulist",
        title: "Leopoldo_Corkery",
        email: "Karley_Dach@jasper.info",
        updatedAt: "ola.org",
      },
      {
        id: 7,
        assignee: "Kurtis Weissnat",
        title: "Elwyn.Skiles",
        email: "Telly.Hoeger@billy.biz",
        updatedAt: "elvis.io",
      },
      {
        id: 8,
        assignee: "Nicholas Runolfsdottir V",
        title: "Maxime_Nienow",
        email: "Sherwood@rosamond.me",
        updatedAt: "jacynthe.com",
      },
      {
        id: 9,
        assignee: "Glenna Reichert",
        title: "Delphine",
        email: "Chaim_McDermott@dana.io",
        updatedAt: "conrad.com",
      },
      {
        id: 10,
        assignee: "Clementina DuBuque",
        title: "Moriah.Stanton",
        email: "Rey.Padberg@karina.biz",
        updatedAt: "ambrose.net",
      },
    ],
  }),
};
</script>
