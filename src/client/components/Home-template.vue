<template>
	<div>
        <p>Welcome to peer to peer database decentralized prototype build. This is just a project to run some simple examples.</p>

        <br>
        <br>Features:
        <ul id="features">
            <li v-for="item in items" :key="item.id">
                {{ item.name }}
            </li>
        </ul>
        <br>
        <p> Notes: Sea.js (Security, Encryption, Authorization, Javascript) is being worked on by Amark from github as well gun.js to build database peer to peer graph engine.  </p>

    </div>
</template>

<script>
export default {
    //name: 'home',
    data() {
		return {
            items:[
                {name:' * Peer to peer Security, Encryption, Authorization, and Database.'},
                {name:' * Simple account auth graph database.(write, delete, edit, and can not edit other user data)'},
                {name:' * Simple profile (Name, Born, Education, Skills)'},
                {name:' * Contacts (Add / Remove / View Profile of other users contact public key)'},
                {name:' * Private Message (Public Key)'},
                {name:' * Forgot Password / Change Password / Hint (No email since it peer to peer database)'},
                {name:' * Chat (Add / Remove)'},
                {name:' * To Do List (Add / Edit /Remove)'},
                {name:' * Simple Forum (Post / Create / Reply) Topic Post'},
                {name:' * Theme Change (Partly working.)'},
            ]
        }
    }
}
</script>

<style lang="scss">

</style>