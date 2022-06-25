<?php

namespace App\Services;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Repositories\Message\MessageRepository;
use Carbon\Carbon;

class MessageService extends Controller
{
    private $messageRepository;
    public function __construct()
    {
        $this->messageRepository = new MessageRepository();
    }

    public function createMessage($friendId, $message, $messageSender){
        $this->messageRepository->create($this->prepareData($friendId, $message, $messageSender));
    }

    public function updateNotReadMessages($friendId){
        $this->messageRepository->updateNotReadMessages($friendId);
    }

    public function getConversationMessages($friendId){
        return $this->messageRepository->getConversation($friendId);
    }

    public function getConversationUserNotReadMessages($friendId){
        return $this->messageRepository->getConversationUserNotReadMessages($friendId);
    }

    private function prepareData($friendId, $message, $messageSender){
        $data = [
            'from_user' => getUser()->id,
            'to_user' => $friendId,
            'message' => $message,
            'message_sender' => $messageSender,
            'read' => false,
            'date' => Carbon::now('Europe/Madrid')
        ];

        return $data;
    }
}
