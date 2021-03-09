<?php

namespace App\Http\Controllers;

use App\Model\MenuPhoto;
use Illuminate\Http\Request;

class MenuPhotoController extends Controller
{
    public function store(Request $request)
    {
        $files = $request->file('menu_photos');
        if (!empty($files)) {
            foreach ($files as $file) {
                $path = public_path('/images');
                $imagePath = $file->move($path, $file->getClientOriginalName());
                $imagepath = $file->getClientOriginalName();
                $photo = new MenuPhoto;
                $photo->menu_id = $request->menu_id;
                $photo->imagepath = $imagePath;
                $photo->save();
            }
            return response()->json(["Photos are saved" => $files], 200);
        }
    }

    public function update(Request $request, MenuPhoto $photo)
    {
        $file = $request->file('menu_photos');
        if (!empty($file)) {
            $path = public_path('/images');
            $imagePath = $file->move($path, $file->getClientOriginalName());
            $imagepath = $file->getClientOriginalName();
            $photo->imagepath = $imagePath;
            $photo->update();
            return response()->json(["Photo is updated" => $photo], 200);
        }
    }
}
