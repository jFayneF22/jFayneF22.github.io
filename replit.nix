{ pkgs }: {
  deps = [
    pkgs.dragon
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
  ];
}