<template lang="pug">
  .container
    .row(@change="getScaleNotes()")
      .col.mb-3
        strong Nota:
        select.form-control(v-model="note")
          option(v-for="note in notes") {{note}}
      .col.mb-3
        strong Escala:
        select.form-control(v-model="scale" )
          option(v-for="scale in scales") {{scale}}
    .row(@change="setMidi(midi)")
      .col.mb-3
        strong Midi:
        select.form-control(v-model="midi")
          option(v-for="(midi) in midis") {{midi.name}}
      .col.mb-3
         button(type='button' class="pure-button pure-button-primary"  @click="playMusic()") play
    hr
    .row.no-gutters
      .col(v-for="(note, index) in notesByNote")
        .p-1.border.text-center(:class="[scaleNotes.includes(note) ? ['bg-' + colorsByNote[index]] : 'opacity-25']")
          .font-weight-bold.text-white.text-shadow {{note}}
    hr
    Guitar(:noteColor="noteColor" :scaleNotes="scaleNotes" :midiFile="midiFile")
</template>

<script>
import Guitar from "@/components/Guitar";
import scaleMusic from "@/services/scaleMusic";

export default {
  data() {
    return {
      note: "C",
      notes: ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"],
      colors: [
        "gray",
        "gray-red",
        "red",
        "red-orange",
        "orange",
        "yellow",
        "yellow-green",
        "green",
        "green-blue",
        "blue",
        "blue-purple",
        "purple"
      ],
      noteColor: [
        { note: "C", color: "gray" },
        { note: "C#/Db", color: "gray-red" },
        { note: "D", color: "red" },
        { note: "D#/Eb", color: "red-orange" },
        { note: "E", color: "orange" },
        { note: "F", color: "yellow" },
        { note: "F#/Gb", color: "yellow-green" },
        { note: "G", color: "green" },
        { note: "G#/Ab", color: "green-blue" },
        { note: "A", color: "blue" },
        { note: "A#/Bb", color: "blue-purple" },
        { note: "B", color: "purple" }
      ],
      scale: null,
      scales: [],
      scaleNote: null,
      scaleNotes: [],
      scaleRoman: [],
      midi: null,
      midiFile: null,
      midis: [],
    };
  },
  computed: {
    notesByNote() {
      return this.notes
        .slice(this.notes.indexOf(this.note))
        .concat(this.notes.slice(0, this.notes.indexOf(this.note)));
    },
    colorsByNote() {
      return this.colors
        .slice(this.notes.indexOf(this.note))
        .concat(this.colors.slice(0, this.notes.indexOf(this.note)));
    }
  },
  components: {
    Guitar
  },
  methods: {

    playMusic(){
      this.$emit("myevent")
    },

    getMidi(){
      this.midis = [{name: "Happy Birthday - F Maior", file: "data:audio/mid;base64,TVRoZAAAAAYAAQACAQBNVHJrAAAAGgD/WAQEAhgIAP9ZAv8AAP9YBAMCGAgB/y8ATVRyawAAAagAsFsyALAKSQCwWzIAsApJALAAAACwIAAAwAAAkDxGgS2QPAATkDxIOpA8AAaQPlMAkDVJAJA5SIFnkD4AGZA8SIFnkDwAGZBBVYFOkDUAAJA5ABmQQQAZkEBPAJAwUQCQOlGDTpBAADKQPEeBLZA8ABOQPEgOkDAAAJA6ACyQPAAGkD5VAJAwUACQOk+BZ5A+ABmQPEWBZ5A8ABmQQ1qBTpAwAACQOgAZkEMAGZBBSwCQNUkAkDlJg06QQQAykDxFgS2QPAATkDxKDpA1AACQOQAskDwABpBIYwCQNU0AkDlPgWeQSAAZkEVKgWeQRQAZkEFCgU6QNQAAkDkAGZBBABmQQEkAkDVRAJA6VIFnkEAAGZA+RYFH/1EDOThwIJA+AAD/UQMJJ8AZkEZZgS2QRgAB/1EDOThwEpBGTg6QNQAAkDoAAP9RAwknwCyQRgAGkEVMAJA1SwCQOUuBZ5BFABmQQUGBTpA1AACQOQAZkEEAGZBDTQCQME4AkDpPgWeQQwAAkDAAAJA6ABmQQUkAkDVMAJA5TIVOkEEAAJA1AACQOQAB/y8A"},
                    {name: "Silent Night - C maior", file: "data:audio/mid;base64,TVRoZAAAAAYAAQACAQBNVHJrAAAAGQD/WAQDAhgIAP9ZAgAAAP9RAwknwAH/LwBNVHJrAAACtADAAACweQAAsEAAALBbMACwCjMAsAdkAJBDNQCweQAAsEAAALBbMACwCjMAsAdkAP8DBVBpYW5vAJA8NYMAkEU4B4BDAHmQQz0CgEUAgX6QQDYAgDwAAJA8OQWAQwCFe5BDQQCAPAAAkDxAD4BAAIJxkEVDB4BDAHmQQzoCgEUAgX6QQDMAgDwAAJA8PQWAQwCBe4A8AACQOz2CAIA7AACQOT2BWYBAACeQSkcAgDkAAJA3OoQAgEoAAJBKQoIAkEc6AIA3AACQNzcFgEoAg3uANwAAkDc9ggCQSDoAgDcAAJA8Rw+ARwCDcYBIAACQSDuCAJBDMQCAPAAAkDw+BYBIAIVUgEMAJ5BFOwCAPAAAkDU2hACARQAAkEU/ggCQSEgAgDUAAJA1OwWARQCCe5BHNweASAB5kEUwAoBHAIF+kEM7AIA1AACQPEgFgEUAgnuQRT0HgEMAeZBDQwKARQCBfpBAQgCAPAAAkDxBBYBDAIVUgEAAJ5BFPwCAPAAAkDU7hACARQAAkEU+ggCQSEYAgDUAAJA1OQWARQCCe5BHPAeASAB5kEU1AoBHAIF+kEM7AIA1AACQPEQFgEUAgnuQRT4HgEMAeZBDPAKARQCBfpBAMwCAPAAAkDw6BYBDAIF7gDwAAJA7N4IAgDsAAJA5PIFZgEAAJ5BKSgCAOQAAkDc5hACASgAAkEpEggCQTUgAgDcAAJA3QwWASgCBe5BKOwWATQCBe5BHQAWASgCBe5BIUACANwAAkDxTBYBHAIV7kExMAIA8AACQPEIPgEgAhUqATAAnkEg1AIA8AACQPECCAJBDLQWASACBe5BAOgWAQwCBe5BDPgCAPAAAkDc4BYBAAIJ7kEE3B4BDAHmQPi8CgEEAgX6QPDsAgDcAAJA8RAWAPgCFVIA8ACeAPAAB/y8A"}];
    },
    setMidi(){
      
      var index = this.midis.map(function (midi) { return midi.name; }).indexOf(this.midi);
      this.midiFile = this.midis[index].file
    },

    async getScaleNotes() {
      const { data } = await scaleMusic.get("/scale/notes", {
        params: {
          note: this.note,
          tonic: this.scale
        }
      });
      this.scaleNotes = data;
      this.scaleNote = this.scaleNotes[0];
    },
    async getScales() {
      const { data } = await scaleMusic.get("/scales");
      this.scales = data;
      this.scale = this.scales[0];
    }
  },
  async mounted() {
    this.getMidi();
    await this.getScales();
    await this.getScaleNotes();
  },
};
</script>
