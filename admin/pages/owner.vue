<template>
    <main>
        <div class="container-fluid c-section">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-spacing-top-medium"></div>
                    <h2>Add new owner</h2>
                    <form action="">
                        <!-- Type -->
                        <div class="a-spacing-top-medium">
                            <label>Name</label>
                            <input
                                type="text"
                                class="a-input-text"
                                style="width: 100%"
                                v-model="name"
                            />
                        </div>
                        <!-- About -->
                        <div class="a-spacing-top-medium">
                            <label>About</label>
                            <input
                                type="text"
                                class="a-input-text"
                                style="width: 100%"
                                v-model="about"
                            />
                        </div>
                        <!-- Photo link-->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;">Photo</label>
                                <input type="text" class="a-input-text" style="width: 100%;" v-model="photo">
                            </div>
                        <hr />
                        <!-- Button -->
                        <div class="a-spacing-top-large">
                            <span class="a-button-register">
                                <span class="a-button-inner">
                                    <span
                                        class="a-button-text"
                                        @click="onAddOwner"
                                        >Add owner</span
                                    >
                                </span>
                            </span>
                        </div>
                    </form>
                    <br />
                    <ul class="list-group-item">
                        <li v-for="owner in owners" :key="owner._id">
                            {{ owner.name }}
                        </li>
                    </ul>    
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({ $axios }) {
        try {
            let response = await $axios.$get(
                "http://localhost:8080/owner/getall"
            );
            return {
                owners: response.owners,
            };
        } catch (err) {
            console.log(err);
        }
    },
    data() {
        return {
            name: "",
            about: "",
            photo: "",
        };
    },
    methods: {
        async onAddOwner() {
            try {
                let data = { name: this.name, about: this.about, photo: this.photo};
                let response = await this.$axios.$post(
                    "http://localhost:8080/owner/add",
                    data
                );
                this.owners.push(data);
                this.name = ""
                this.about = ""
                this.photo = ""
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>

<style>
</style>