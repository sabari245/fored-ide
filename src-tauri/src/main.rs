// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::File;
use std::io::Write;
use std::process::Command;

#[tauri::command]
fn create_project(directory: &str, name: &str) {
    std::env::set_current_dir(directory).expect("Failed to change directory");

    Command::new("npm")
        .args(&["create", "vite@latest", name, "--template", "vanilla"])
        .status()
        .expect("Failed to create Vite project");

    std::env::set_current_dir(format!("{}/{}", directory, name))
        .expect("Failed to move to the project directory");

    Command::new("npm")
        .args(&["install"])
        .status()
        .expect("Failed to install the packages");
}

#[tauri::command]
fn update_code(directory: &str, code: &str) {
    let index_file_path = format!("{}/src/index.html", directory);

    let mut index_file =
        File::create(index_file_path).expect("Failed to open index.html file for writing");

    index_file
        .write_all(code.as_bytes())
        .expect("Failed to write HTML code to index.html");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_project, update_code])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
