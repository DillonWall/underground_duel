<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.10.2" name="player" tilewidth="48" tileheight="48" tilecount="60" columns="6">
 <editorsettings>
  <export target="../../underground_duel/public/assets/spritesheets/player.tsj" format="json"/>
 </editorsettings>
 <image source="../../assets/Characters/player.png" width="288" height="480"/>
 <tile id="0" type="Idle_Down,loop">
  <objectgroup draworder="index" id="2">
   <object id="1" x="20" y="24" width="9" height="17"/>
  </objectgroup>
  <animation>
   <frame tileid="0" duration="100"/>
   <frame tileid="1" duration="100"/>
   <frame tileid="2" duration="100"/>
   <frame tileid="3" duration="100"/>
   <frame tileid="4" duration="100"/>
   <frame tileid="5" duration="100"/>
  </animation>
 </tile>
 <tile id="6" type="Idle_Right,loop">
  <objectgroup draworder="index" id="2">
   <object id="1" x="20" y="24" width="9" height="17"/>
  </objectgroup>
  <animation>
   <frame tileid="6" duration="120"/>
   <frame tileid="7" duration="120"/>
   <frame tileid="8" duration="120"/>
   <frame tileid="9" duration="120"/>
   <frame tileid="10" duration="120"/>
   <frame tileid="11" duration="120"/>
  </animation>
 </tile>
 <tile id="12" type="Idle_Up,loop">
  <objectgroup draworder="index" id="2">
   <object id="1" x="20" y="24" width="9" height="17"/>
  </objectgroup>
  <animation>
   <frame tileid="12" duration="120"/>
   <frame tileid="13" duration="120"/>
   <frame tileid="14" duration="120"/>
   <frame tileid="15" duration="120"/>
   <frame tileid="16" duration="120"/>
   <frame tileid="17" duration="120"/>
  </animation>
 </tile>
 <tile id="18" type="Move_Down,loop">
  <objectgroup draworder="index" id="2">
   <object id="1" x="20" y="24" width="9" height="17"/>
  </objectgroup>
  <animation>
   <frame tileid="18" duration="120"/>
   <frame tileid="19" duration="120"/>
   <frame tileid="20" duration="120"/>
   <frame tileid="21" duration="120"/>
   <frame tileid="22" duration="120"/>
   <frame tileid="23" duration="120"/>
  </animation>
 </tile>
 <tile id="24" type="Move_Right,loop">
  <objectgroup draworder="index" id="2">
   <object id="1" x="20" y="24" width="9" height="17"/>
  </objectgroup>
  <animation>
   <frame tileid="24" duration="120"/>
   <frame tileid="25" duration="120"/>
   <frame tileid="26" duration="120"/>
   <frame tileid="27" duration="120"/>
   <frame tileid="28" duration="120"/>
   <frame tileid="29" duration="120"/>
  </animation>
 </tile>
 <tile id="30" type="Move_Up,loop">
  <objectgroup draworder="index" id="2">
   <object id="1" x="20" y="24" width="9" height="17"/>
  </objectgroup>
  <animation>
   <frame tileid="30" duration="120"/>
   <frame tileid="31" duration="120"/>
   <frame tileid="32" duration="120"/>
   <frame tileid="33" duration="120"/>
   <frame tileid="34" duration="120"/>
   <frame tileid="35" duration="120"/>
  </animation>
 </tile>
 <tile id="36" type="Attack_Down">
  <objectgroup draworder="index" id="2">
   <object id="1" x="20" y="24" width="9" height="17"/>
   <object id="2" type="Hit" x="13" y="24" width="24" height="24"/>
  </objectgroup>
  <animation>
   <frame tileid="36" duration="120"/>
   <frame tileid="37" duration="120"/>
   <frame tileid="38" duration="120"/>
   <frame tileid="39" duration="120"/>
  </animation>
 </tile>
 <tile id="42" type="Attack_Right">
  <objectgroup draworder="index" id="2">
   <object id="1" x="20" y="24" width="9" height="17"/>
   <object id="2" type="Hit" x="18" y="21" width="24" height="24"/>
  </objectgroup>
  <animation>
   <frame tileid="42" duration="120"/>
   <frame tileid="43" duration="120"/>
   <frame tileid="44" duration="120"/>
   <frame tileid="45" duration="120"/>
  </animation>
 </tile>
 <tile id="48" type="Attack_Up">
  <objectgroup draworder="index" id="2">
   <object id="1" x="20" y="24" width="9" height="17"/>
   <object id="3" type="Hit" x="12" y="17" width="24" height="24"/>
  </objectgroup>
  <animation>
   <frame tileid="48" duration="120"/>
   <frame tileid="49" duration="120"/>
   <frame tileid="50" duration="120"/>
   <frame tileid="51" duration="120"/>
  </animation>
 </tile>
 <tile id="54" type="Death">
  <animation>
   <frame tileid="54" duration="300"/>
   <frame tileid="55" duration="300"/>
   <frame tileid="56" duration="300"/>
  </animation>
 </tile>
</tileset>
