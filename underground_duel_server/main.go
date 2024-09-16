package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	fmt.Println("Hello World")
	setupLove()
	setupRoutes()
	log.Fatal(http.ListenAndServe(":8080", nil))
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
	http.HandleFunc("/", homePage)
	http.HandleFunc("/ws", wsEndpoint)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Home HTTP")
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	// upgrade HTTP conn to WebSocket
	ws, err := upgrader.Upgrade(w, r, nil)
    defer ws.Close()
	if err != nil {
		log.Println(err)
	}
	log.Println("Client connected!")
	err = ws.WriteMessage(websocket.TextMessage, []byte("Hi client!"))
	if err != nil {
		log.Println(err)
	}

	reader(ws)
}

// Listen forever for new messages
func reader(conn *websocket.Conn) {
	for {
		// Read in a message
        _, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		go handleMessage(p, conn)
	}
}

func handleMessage(msg []byte, conn *websocket.Conn) {
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
        log.Println(moveData.X, moveData.Y)
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
