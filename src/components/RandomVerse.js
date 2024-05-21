// src/components/RandomVerse.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import X2JS from 'x2js';

const VerseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
  background: #f7fafc;
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const VerseText = styled.p`
  font-size: 1.5em;
  margin-bottom: 20px;
`;

const VerseInfo = styled.p`
  font-size: 1.7em;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #ffca28;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #ffb300;
  }
`;

const RandomVerse = () => {
  const [verse_id, setVerseId] = useState('');
  const [verse_eng, setVerseEng] = useState('');
  const [verse_id_info, setVerseIdInfo] = useState('');
  const [verse_eng_info, setVerseEngInfo] = useState('');
  const [loading, setLoading] = useState(true);

  const verseList = [
    //PERJANJIAN LAMA
    //TAURAT
    {
      Nama : 'Kejadian',
      Nama_id : 'Kej',
      Nama_eng : 'Genesis',
      Pasal : 50,
    },
    {
      Nama : 'Keluaran',
      Nama_id : 'Kel',
      Nama_eng : 'Exodus',
      Pasal : 40,
    },
    {
      Nama : 'Imamat',
      Nama_id : 'Ima',
      Nama_eng : 'Leviticus',
      Pasal : 27,
    },
    {
      Nama : 'Bilngan',
      Nama_id : 'Bil',
      Nama_eng : 'Numbers',
      Pasal : 36,
    },
    {
      Nama : 'Ulangan',
      Nama_id: 'Ula',
      Nama_eng : 'Deuteronomy',
      Pasal : 34,
    },

    //TULISAN-TULISAN
    {
      Nama : 'Yosua',
      Nama_id : 'Yos',
      Nama_eng : 'Joshua',
      Pasal : 24,
    },
    {
      Nama : 'Hakim-Hakim',
      Nama_id : 'Hak',
      Nama_eng : 'Deuteronomy',
      Pasal : 21,
    },
    {
      Nama : 'Rut',
      Nama_id : 'rut',
      Nama_eng : 'Ruth',
      Pasal : 4,
    },
    {
      Nama : '1 Samuel',
      Nama_id : '1Sam',
      Nama_eng : '1Samuel',
      Pasal : 31,
    },
    {
      Nama : '2 Samuel',
      Nama_id : '2Sam',
      Nama_eng : '2Samuel',
      Pasal : 24,
    },
    {
      Nama : '1 Raja-Raja',
      Nama_id : '1Raj',
      Nama_eng : '1Kings',
      Pasal : 22,
    },
    {
      Nama : '2 Raja-Raja',
      Nama_id : '2Raj',
      Nama_eng : '2Kings',
      Pasal : 25,
    },
    {
      Nama : '1 Tawarikh',
      Nama_id : '1Taw',
      Nama_eng : '1Chronicles',
      Pasal : 29,
    },
    {
      Nama : '2 Tawarikh',
      Nama_id : '2Taw',
      Nama_eng : '2Chronicles',
      Pasal : 36,
    },
    {
      Nama : 'Ezra',
      Nama_id : 'Ezr',
      Nama_eng : 'Ezra',
      Pasal : 10,
    },
    {
      Nama : 'Nehemia',
      Nama_id : 'Neh',
      Nama_eng : 'Nehemiah',
      Pasal : 13,
    },
    {
      Nama : 'Ester',
      Nama_id : 'Est',
      Nama_eng : 'Esther',
      Pasal : 10,
    },
    {
      Nama : 'Ayub',
      Nama_id : 'Ayu',
      Nama_eng : 'Job',
      Pasal : 42,
    },
    {
      Nama : 'Mazmur',
      Nama_id : 'Maz',
      Nama_eng : 'Psalms',
      Pasal : 150,
    },
    {
      Nama : 'Amsal',
      Nama_id : 'Ams',
      Nama_eng : 'Proverbs',
      Pasal : 31,
    },
    {
      Nama : 'Pengkhotbah',
      Nama_id : 'Pen',
      Nama_eng : 'Ecclesiastes',
      Pasal : 12,
    },
    {
      Nama : 'Kidung Agung',
      Nama_id : 'Kid',
      Nama_eng : 'Songs',
      Pasal : 8,
    },

    //NABI-NABI
    {
      Nama : 'Yesaya',
      Nama_id : 'Yes',
      Nama_eng : 'Isaiah',
      Pasal : 66,
    },
    {
      Nama : 'Yeremia',
      Nama_id : 'Yer',
      Nama_eng : 'Jeremiah',
      Pasal : 52,
    },
    {
      Nama : 'Ratapan',
      Nama_id : 'Rat',
      Nama_eng : 'Lamentations',
      Pasal : 5,
    },
    {
      Nama : 'Yehezkiel',
      Nama_id : 'Yeh',
      Nama_eng : 'Ezekiel',
      Pasal : 48,
    },
    {
      Nama : 'Daniel',
      Nama_id : 'Dan',
      Nama_eng : 'Daniel',
      Pasal : 12,
    },
    {
      Nama : 'Hosea',
      Nama_id : 'Hos',
      Nama_eng : 'Hosea',
      Pasal : 14,
    },
    {
      Nama : 'Yoel',
      Nama_id : 'Yoe',
      Nama_eng : 'Joel',
      Pasal : 3,
    },
    {
      Nama : 'Amos',
      Nama_id : 'Amo',
      Nama_eng : 'Amos',
      Pasal : 9,
    },
    {
      Nama : 'Obaja',
      Nama_id : 'Oba',
      Nama_eng : 'Obadiah',
      Pasal : 1,
    },
    {
      Nama : 'Yunus',
      Nama_id : 'Yun',
      Nama_eng : 'Jonah',
      Pasal : 4,
    },
    {
      Nama : 'Mikha',
      Nama_id : 'Mik',
      Nama_eng : 'Micah',
      Pasal : 7,
    },
    {
      Nama : 'Nahum',
      Nama_id : 'Nah',
      Nama_eng : 'Nahum',
      Pasal : 3,
    },
    {
      Nama : 'Habakuk',
      Nama_id : 'Hab',
      Nama_eng : 'Habakkuk',
      Pasal : 3,
    },
    {
      Nama : 'Zefanya',
      Nama_id : 'Zef',
      Nama_eng : 'Zeppaniah',
      Pasal : 3,
    },
    {
      Nama : 'Hagai',
      Nama_id : 'Hag',
      Nama_eng : 'Haggai',
      Pasal : 2,
    },
    {
      Nama : 'Zakharia',
      Nama_id : 'Zak',
      Nama_eng : 'Zechariah',
      Pasal : 14,
    },
    {
      Nama : 'Maleakhi',
      Nama_id : 'Mal',
      Nama_eng : 'Malachi',
      Pasal : 4,
    },

    //PERJANJIAN BARU
    //INJIL
    {
      Nama : 'Matius',
      Nama_id : 'Mat',
      Nama_eng : 'Matthew',
      Pasal : 28,
    },
    {
      Nama : 'Markus',
      Nama_id : 'Mar',
      Nama_eng : 'Mark',
      Pasal : 16,
    },
    {
      Nama : 'Lukas',
      Nama_id : 'Luk',
      Nama_eng : 'Luke',
      Pasal : 24,
    },
    {
      Nama : 'Yohanes',
      Nama_id : 'Yoh',
      Nama_eng : 'John',
      Pasal : 21,
    },

    //SEJARAH
    {
      Nama : 'Kisah Para Rasul',
      Nama_id : 'Kis',
      Nama_eng : 'Acts',
      Pasal : 28,
    },

    //SURAT-SURAT
    {
      Nama : 'Roma',
      Nama_id : 'Rom',
      Nama_eng : 'Romans',
      Pasal : 16,
    },
    {
      Nama : '1 Korintus',
      Nama_id : '1Kor',
      Nama_eng : '1Chorintians',
      Pasal : 16,
    },
    {
      Nama : '2 Korintus',
      Nama_id : '2Kor',
      Nama_eng : '2Chorintians',
      Pasal : 13,
    },
    {
      Nama : 'Galatia',
      Nama_id : 'Gal',
      Nama_eng : 'Galatians',
      Pasal : 6,
    },
    {
      Nama : 'Efesus',
      Nama_id : 'Efe',
      Nama_eng : 'Ephesians',
      Pasal : 6,
    },
    {
      Nama : 'Filipi',
      Nama_id : 'Fil',
      Nama_eng : 'Philippians',
      Pasal : 4,
    },
    {
      Nama : 'Kolose',
      Nama_id : 'Kol',
      Nama_eng : 'Colossians',
      Pasal : 4,
    },
    {
      Nama : '1 Tesalonika',
      Nama_id : '1Tes',
      Nama_eng : '1Thessalonians',
      Pasal : 5,
    },
    {
      Nama : '2 Tesalonika',
      Nama_id : '2Tes',
      Nama_eng : '2Thesallonians',
      Pasal : 3,
    },
    {
      Nama : '1 Timotius',
      Nama_id : '1Tim',
      Nama_eng : '1Timothy',
      Pasal : 6,
    },
    {
      Nama : '2 Timotius',
      Nama_id : '2Tim',
      Nama_eng : '2Timothy',
      Pasal : 4,
    },
    {
      Nama : 'Titus',
      Nama_id : 'Tit',
      Nama_eng : 'Titus',
      Pasal : 3,
    },
    {
      Nama : 'Filemon',
      Nama_id : 'Filemon',
      Nama_eng : 'Philemon',
      Pasal : 1,
    },
    {
      Nama : 'Ibrani',
      Nama_id : 'Ibr',
      Nama_eng : 'Hebrews',
      Pasal : 13,
    },
    {
      Nama : 'Yakobus',
      Nama_id : 'Yak',
      Nama_eng : 'James',
      Pasal : 5,
    },
    {
      Nama : '1 Petrus',
      Nama_id : '1Pet',
      Nama_eng : '1Peter',
      Pasal : 5,
    },
    {
      Nama : '2 Petrus',
      Nama_id : '2Pet',
      Nama_eng : '2Peter',
      Pasal : 3,
    },
    {
      Nama : '1 Yohanes',
      Nama_id : '1Yoh',
      Nama_eng : '1John',
      Pasal : 5,
    },
    {
      Nama : '2 Yohanes',
      Nama_id : '2Yoh',
      Nama_eng : '2John',
      Pasal : 1,
    },
    {
      Nama : '3 Yohanes',
      Nama_id : '3Yoh',
      Nama_eng : '3John',
      Pasal : 1,
    },
    {
      Nama : 'Yudas',
      Nama_id : 'Yud',
      Nama_eng : 'Jude',
      Pasal : 1,
    },
    {
      Nama : 'Wahyu',
      Nama_id : 'Wah',
      Nama_eng : 'Revelation',
      Pasal : 22,
    }
  ];

  const fetchVerse = async () => {
    setLoading(true);
    try {
      //X2JS Lib For Convert XML to JSON
      var x2js = new X2JS();

      //Get Random Verse data from Bible-api's API
      var get = await axios.get('https://cors-anywhere.herokuapp.com/https://bible-api.com/?random=verse');
      var data = get.data.verses[0];
      // console.log("data: ", data);

      //Assign Book, Chapter, and Verse
      const book_name = data.book_name;
      const chapter = data.chapter;
      const verse = data.verse;

      const verse_id = data.text;

      // console.log("book: ", book_name);
      // console.log("chapter: ", chapter);
      // console.log("verse: ", verse);
      // console.log("eng text: ", text);

      const found = verseList.find((book) => book.Nama_eng == book_name);
      const book_id = found.Nama_id;
 
      //Get Verse data from Alkitab Sabda's API
      get = await axios.get('https://cors-anywhere.herokuapp.com/https://alkitab.sabda.org/api/passage.php?passage=' + book_id + '%20' + chapter + ':' + verse);
      data = x2js.xml2js(get.data);
      // console.log("data: ", data.bible.book.chapter.verses.verse.text);
      
      const verse_eng = data.bible.book.chapter.verses.verse.text;
      //Set Random Book and Chapter
      // const book = Math.floor(Math.random() * verseList.length);
      // console.log("book: ", book);
      // const chapter = Math.floor(Math.random() * verseList[book].Pasal+1);
      // console.log("chapter: ", chapter);
      
      // //Get Book and Chapter Data, Then Generate Verse Number Based on Chapter
      // var get = await axios.get('https://cors-anywhere.herokuapp.com/https://alkitab.sabda.org/api/chapter.php?book='+ book);
      // var data = x2js.xml2js(get.data);

      // const verse_id = Math.floor(Math.random() * data.bible.verses.verse.length);
      // console.log ("verse: ", verse_id);

      // //INDONESIAN VERSE
      // const verse_id_text = data.bible.verses.verse[verse_id].text;
      // console.log ("verse_id text: ", verse_id_text);

      // //Get the English Version of the same verse
      // get = await axios.get('https://cors-anywhere.herokuapp.com/https://bible-api.com/' + verseList[book].Nama_eng + '%20' + chapter + ':' + verse_id);
      // console.log(get.data);
      // const verse_eng_text = get.data.text;
      // console.log("verse_eng text: ", verse_eng_text);
      // //const servedVerse = indo_verse + " " + eng_verse;
      //console.log(verse);
      setVerseIdInfo(found.Nama + " " + chapter + ":" + verse);
      setVerseEngInfo(found.Nama_eng + " " + chapter + ":" + verse);
      setVerseId(verse_id);
      setVerseEng(verse_eng);
    } catch (error) {
      console.error('Error fetching the verse:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerse();
  }, []);

  return (
    <VerseContainer>
      <h1>Joy Bible Verse</h1>
      {loading ? <p></p> : <VerseInfo>{verse_id_info}</VerseInfo>}
      {loading ? <p>Loading...</p> : <VerseText>{verse_eng}</VerseText>}
      {loading ? <p></p> : <VerseInfo>{verse_eng_info}</VerseInfo>}
      {loading ? <p></p> : <VerseText>{verse_id}</VerseText> }
      {/* <Button onClick={fetchVerse}>Get Another Verse</Button> */}
    </VerseContainer>
  );
};

export default RandomVerse;
