package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/websocket"
    "github.com/joho/godotenv"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}
var lastPlayerId uint16 = 0
var players = map[uint16]*Player{}

func main() {
    setupEnvFile()
	setupLove()
	setupRoutes()
	go gameLoop()
	log.Fatal(http.ListenAndServeTLS(os.Getenv("SERVER_ADDR"), os.Getenv("CERT_FILE"), os.Getenv("KEY_FILE"), nil))
}

func setupEnvFile() {
    err := godotenv.Load(".env")
    if err != nil {
        log.Fatalf("Error loading .env file: %s", err)
    }
}

func setupLove() {
	// for bun to love pea forever
	//and for pea to reciprocate
	pea := 2
	bun := 2
	if pea < 3*bun {
		fmt.Println("bun is cutie")
	}
}

func setupRoutes() {
	http.HandleFunc("/", wsEndpoint)
}

func gameLoop() {
	lastTick := time.Now()
	targetDT := time.Duration(time.Second / 20) // target 20 TPS
	for {
		go tick()

		// Sleep if too fast
		now := time.Now()
		dt := now.Sub(lastTick)
		if dt < targetDT {
			time.Sleep(time.Duration(targetDT.Nanoseconds() - dt.Nanoseconds()))
		}
		log.Println("TPS: ", 1/time.Now().Sub(lastTick).Seconds())
		lastTick = time.Now()
	}
}

func tick() {
	tickInfo := TickInfo{}
	tickInfo.PlayerDatas = *asPlayerData(&players)
	for _, player := range players {
		player.ws.WriteJSON(tickInfo)
	}
}

type TickInfo struct {
	PlayerDatas map[uint16]PlayerData
}

type PlayerData struct {
	Loc Vec2D
}

type Vec2D struct {
	X int32
	Y int32
}

func asPlayerData(players *map[uint16]*Player) *map[uint16]PlayerData {
	playerDatas := map[uint16]PlayerData{}
	for playerId, player := range *players {
		playerDatas[playerId] = PlayerData{Vec2D{player.X, player.Y}}
	}
	return &playerDatas
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	// upgrade HTTP conn to WebSocket
	ws, err := upgrader.Upgrade(w, r, nil)
	defer ws.Close()
	if err != nil {
		log.Println(err)
	}

	// Create player and assign player id
	player := new(Player)
	player.ws = ws
	if lastPlayerId > math.MaxUint16 {
		lastPlayerId = 0
	} else {
		lastPlayerId++
	}
	players[lastPlayerId] = player
	defer delete(players, lastPlayerId)

	log.Println("Client connected!")
	err = ws.WriteMessage(websocket.TextMessage, []byte(fmt.Sprintf(`{"PlayerId":"%d"}`, lastPlayerId)))
	if err != nil {
		log.Println(err)
	}

	reader(ws, lastPlayerId)
}

type Player struct {
	ws *websocket.Conn
	X  int32
	Y  int32
}

// Listen forever for new messages
func reader(conn *websocket.Conn, playerId uint16) {
	for {
		// Read in a message
		_, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		go handleMessage(p, conn, playerId)
	}
}

func handleMessage(msg []byte, conn *websocket.Conn, playerId uint16) {
	var jsonObject SocketMessage
	err := json.Unmarshal(msg, &jsonObject)
	if err != nil {
		log.Println(err)
		return
	}

	switch msgType := jsonObject.MsgType; msgType {
	case "move":
		var moveData MoveData
		err := json.Unmarshal(msg, &moveData)
		if err != nil {
			log.Println(err)
			return
		}
		players[playerId].X = moveData.X
		players[playerId].Y = moveData.Y
		// log.Println(players[playerId].X, players[playerId].Y)
	default:
		// Log and parrot the message we just read in
		log.Println(msgType)
		err = conn.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			log.Println(err)
			return
		}
	}
}

type SocketMessage struct {
	MsgType string
}

type MoveData struct {
	X int32
	Y int32
}
