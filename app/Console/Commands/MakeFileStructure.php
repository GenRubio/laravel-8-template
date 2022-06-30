<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeFileStructure extends Command
{
    private $namespace;
    private $suffix;
    private $stubPath;
    private $extension;
    private $folderPermissions;
    private $path;
    private $fileName;
    private $fullPath;
    private $fullName;
    private $pathDirectories;
    protected $signature = 'command';
    protected $description = 'Command description';

    /**
     * Method that change the keywords in the stub files, for the ones given
     *
     * @param string $file
     * @return string
     */
    public function replaceWords(string $file)
    {
        return "";
    }

    /**
     * Logic
     */
    public function handle()
    {
        $this->setAttributes();
        $this->setPathDirectories();

        if ($this->validateTaskName()) {
            $this->makeDirectories();
            $this->makeFile();
        }
    }

    private function setAttributes()
    {
        $basicPath = $this->namespace . $this->argument('path');
        $this->path = $this->argument('path') . $this->suffix;
        $this->fullPath = $basicPath . $this->suffix . $this->extension;
        $this->fileName = explode("/", $basicPath)[count(explode("/", $basicPath)) - 1] . $this->suffix;
        $this->fullName = explode("/", $this->fullPath)[count(explode("/", $this->fullPath)) - 1];
    }

    /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */

    private function makeFile()
    {
        $file = $this->replaceWords(file_get_contents($this->stubPath));
        $this->saveFile($file);
    }

    private function saveFile(string $file)
    {
        file_put_contents($this->fullPath, $file);
        $this->info("{$this->fullName} created successfully!");
    }

    private function makeDirectories()
    {
        if (!is_dir($this->pathDirectories)) {
            mkdir($this->pathDirectories, $this->folderPermissions, true);
        }
    }

    private function validateTaskName()
    {
        if (file_exists($this->fullPath)) {
            $this->error("{$this->fullName} already exists");
            return false;
        }
        return true;
    }

    /*
    |--------------------------------------------------------------------------
    | MUTATORS
    |--------------------------------------------------------------------------
    */

    private function setPathDirectories()
    {
        $path = "";
        $directories = explode("/", $this->fullPath);
        for ($a = 0; $a <= count($directories) - 2; $a++) {
            $path .= $directories[$a] . '/';
        }
        $this->pathDirectories = rtrim($path, "/");
    }

    protected function setNameSpace($value)
    {
        $this->namespace = $value;
    }

    protected function setSuffix($value)
    {
        $this->suffix = $value;
    }

    protected function setStubPath($value)
    {
        $this->stubPath = $value;
    }

    protected function setExtension($value)
    {
        $this->extension = $value;
    }

    protected function setFolderPermissions($value)
    {
        $this->folderPermissions = $value;
    }

    /*
    |--------------------------------------------------------------------------
    | ACCESORS
    |--------------------------------------------------------------------------
    */

    public function getNamespace()
    {
        return str_replace("/", "\\", $this->path);
    }

    public function getClassName()
    {
        return $this->fileName;
    }
}
