<template>
  <div class="chat-app">
    <ContactList
      :contacts="contacts"
      @selectContact="selectContact"
      :activeContactId="selectedContact ? selectedContact.id : null"
    />
    <ChatWindow
      v-if="selectedContact"
      :contact="selectedContact"
      :messages="getMessages(selectedContact.id)"
      @sendMessage="sendMessage"
    />
    <input type="text" v-model="revice" @keyup.enter="test" class="test" placeholder="在此测试输入对方消息">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ContactList from './Message/ContactList.vue';
import ChatWindow from './Message/ChatWindow.vue';

interface Contact {
  id: number;
  name: string;
  latestMessage?: string;
  latestMessageTime?: string;
  avatar?: string;
}

interface Message {
  id: number;
  contactId: number;
  text?: string;
  imageUrl?: string;
  time: string;
  sender: string;
}

const contacts = ref<Contact[]>([
  { id: 1, name: '房产中介', avatar: 'https://picture.gptkong.com/20240712/2341b23645147443968cb1af7422d9eff3.jpg' },
  { id: 2, name: '浴皇大帝', avatar: 'https://picture.gptkong.com/20240712/23424e3fbf75a7425fa8fe2264387b08b9.jpeg' },
  { id: 3, name: '素颜女大', avatar: 'https://picture.gptkong.com/20240712/2342ebfba3ba974fac8101e47351e75cc6.jpg' },
  { id: 4, name: '全妆女大', avatar: 'https://picture.gptkong.com/20240712/23435444fd02974cd5b74c904dddf75180.jpg' },
]);

const messages = ref<Message[]>([
  { id: 1, contactId: 1, text: 'Hello Alice!', time: '2024/6/17 10:20', sender: 'me' },
  { id: 2, contactId: 2, text: 'Hi Bob!', time: '2024/6/17 11:30', sender: 'other' },
  { id: 3, contactId: 3, text: 'Hey Charlie!', time: '2024/6/17 12:40', sender: 'other' },
]);

const selectedContact = ref<Contact | null>(null);

function selectContact(contact: Contact) {
  selectedContact.value = contact;
}

function getMessages(contactId: number) {
  return messages.value.filter(message => message.contactId === contactId).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
}

function sendMessage(message: Message) {
  messages.value.push(message);
  updateLatestMessage(message.contactId, message.text || '图片消息', message.time);
}

const revice = ref('');
function receiveMessage(contactId: number, text: string) {
  const currentTime = new Date().toLocaleString(); // Get current time
  const newMessage = {
    id: Date.now(),
    contactId: contactId,
    text: text,
    time: currentTime,
    sender: 'other',
  };
  messages.value.push(newMessage);
  updateLatestMessage(contactId, text, currentTime);
}

const test = () => {
  if (selectedContact.value) {
    receiveMessage(selectedContact.value.id, revice.value);
    revice.value = ''
  }
};

function updateLatestMessage(contactId: number, text: string, time: string) {
  const contact = contacts.value.find(c => c.id === contactId);
  if (contact) {
    contact.latestMessage = text;
    contact.latestMessageTime = time;
  }
}
</script>

<style lang="scss">
.chat-app {
  display: flex;
  justify-content: flex-start;
  position: relative;
}
.test{
  position: absolute;
  left: 0;
  bottom: 40px;
  height: 50px;
}
</style>