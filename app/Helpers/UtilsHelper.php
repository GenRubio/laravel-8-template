<?php

namespace App\Helpers;

use App\Models\Message;
use App\Models\Page;
use App\Models\PresetEmail;
use App\Models\Rgpd;
use App\Models\User;
use App\Services\MessageService;
use App\Services\UserService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Exception;

class UtilsHelper
{
    public static function validateEmail($email)
    {
        $response = [
            'success' => true,
            'message' => ''
        ];
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response = [
                'success' => false,
                'message' => 'Invalid email format'
            ];
        } else {
            $user = (new UserService())->getUserByEmail($email);
            if ($user) {
                $response = [
                    'success' => false,
                    'message' => 'Este email ya esta en uso.'
                ];
            }
        }
        return $response;
    }

    public static function getConversation($friendId, $order)
    {
        $messageService = new MessageService();
        return $messageService->getConversationMessages($friendId)
            ->orderBy('date', $order)->get();
    }

    public static function getChatsStarted()
    {
        $chats = collect();
        foreach (getUser()->friends as $friend) {
            if (count(getConversation($friend->user->id, 'asc')) > 0) {
                $chats->push($friend);
            }
        }
        return $chats;
    }

    public static function getLastMessage($friendId)
    {
        $messageService = new MessageService();
        return $messageService->getConversationMessages($friendId)
            ->orderBy('date', 'desc')->first();
    }

    public static function getNotReadMessages($friendId)
    {
        $messageService = new MessageService();
        return $messageService->getConversationUserNotReadMessages($friendId);
    }

    public static function getHourMessage($date)
    {
        return Carbon::parse($date)->format('H:i');
    }

    public static function getDateMessages($date){
        return Carbon::parse($date)->format('l jS \of F Y');
    }

    public static function getMessageTimestamp($date){
        return Carbon::parse($date)->timestamp;
    }
}
