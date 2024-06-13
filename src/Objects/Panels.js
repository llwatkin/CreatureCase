class Panels extends Phaser.GameObjects.GameObject {
    constructor(scene, type, suspect, colors, animals, items, x) {
        super(scene, type);
        
        // --------- Shirt Panel --------- //
        this.shirtPanel = scene.add.sprite(x, 500, 'panel_small');
        this.shirtPanel.visible = false;

        // Panel options
        this.color1 = scene.add.sprite(x - 50, 500, 'shirts', 'shirt_'+colors[0]+'_style1.png').setScale(0.15).setInteractive({ useHandCursor: true });
        this.color2 = scene.add.sprite(x - 20, 500, 'shirts', 'shirt_'+colors[1]+'_style1.png').setScale(0.15).setInteractive({ useHandCursor: true });
        this.color3 = scene.add.sprite(x + 10, 500, 'shirts', 'shirt_'+colors[2]+'_style1.png').setScale(0.15).setInteractive({ useHandCursor: true });
        this.color4 = scene.add.sprite(x + 40, 500, 'shirts', 'shirt_'+colors[3]+'_style1.png').setScale(0.15).setInteractive({ useHandCursor: true });
        this.color5 = scene.add.sprite(x + 70, 500, 'shirts', 'shirt_'+colors[4]+'_style1.png').setScale(0.15).setInteractive({ useHandCursor: true });
        this.colorOptions = [
            this.color1, this.color2, this.color3,
            this.color4, this.color5
        ];
        for (let color of this.colorOptions) {
            color.visible = false;
            color.on('pointerdown', (pointer) => {
                if (pointer.button == 0) { // Left click adds an x
                    scene.sound.play('click_left');
                    for (let icon of this.xGroup.getChildren()) {
                        if (icon.x == color.x && icon.y == color.y) { // If there's already an x
                            icon.x = 0;
                            icon.y = 0;
                            icon.visible = false;
                            icon.active = false;
                            return;
                        }
                    }
                    // If there is no x, add one
                    let icon = this.xGroup.getFirstDead();
                    icon.x = color.x;
                    icon.y = color.y;
                    icon.visible = true;
                    icon.active = true;
                } else if (pointer.button == 2) { // Right click assigns selected item to suspect
                    scene.sound.play('click_middle');
                    scene.sound.play('shirt');
                    if (color == this.color1) {
                        suspect.change_shirt(colors[0]);
                    } else if (color == this.color2) {
                        suspect.change_shirt(colors[1]);
                    } else if (color == this.color3) {
                        suspect.change_shirt(colors[2]);
                    } else if (color == this.color4) {
                        suspect.change_shirt(colors[3]);
                    } else if (color == this.color5) {
                        suspect.change_shirt(colors[4]);
                    }
                    this.close_panel(this.shirtPanelX, this.shirtPanel, this.shirtPanelButton, this.colorOptions, 500, true);
                }
            });
        }

        this.shirtPanelX = scene.add.sprite(x - 80, 500, 'x_grey').setInteractive({ useHandCursor: true })
            .on('pointerdown', () => { // Close panel
                scene.sound.play('click_exit');
                this.close_panel(this.shirtPanelX, this.shirtPanel, this.shirtPanelButton, this.colorOptions, 500, true);
            });
        this.shirtPanelX.visible = false;
        this.shirtPanelButton = scene.add.sprite(x - 80, 500, 'circle').setScale(0.75).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => { // Open panel
                scene.sound.play('click_exit');
                this.open_panel(this.shirtPanelX, this.shirtPanel, this.shirtPanelButton, this.colorOptions, 500);
            });
        
        // --------- Mask Panel --------- //
        this.maskPanel = scene.add.sprite(x, 300, 'panel_small');
        this.maskPanel.visible = false;
        
        // Panel options
        this.mask1 = scene.add.sprite(x - 50, 300, 'animal_masks', animals[0]+'.png').setScale(0.15).setInteractive({ useHandCursor: true });
        this.mask2 = scene.add.sprite(x - 20, 300, 'animal_masks', animals[1]+'.png').setScale(0.15).setInteractive({ useHandCursor: true });
        this.mask3 = scene.add.sprite(x + 10, 300, 'animal_masks', animals[2]+'.png').setScale(0.15).setInteractive({ useHandCursor: true });
        this.mask4 = scene.add.sprite(x + 40, 300, 'animal_masks', animals[3]+'.png').setScale(0.15).setInteractive({ useHandCursor: true });
        this.mask5 = scene.add.sprite(x + 70, 300, 'animal_masks', animals[4]+'.png').setScale(0.15).setInteractive({ useHandCursor: true });
        this.maskOptions = [
            this.mask1, this.mask2, this.mask3,
            this.mask4, this.mask5
        ];
        for (let mask of this.maskOptions) {
            mask.visible = false;
            mask.on('pointerdown', (pointer) => {
                if (pointer.button == 0) { // Left click adds an x
                    scene.sound.play('click_left');
                    for (let icon of this.xGroup.getChildren()) {
                        if (icon.x == mask.x && icon.y == mask.y) { // If there's already an x
                            icon.x = 0;
                            icon.y = 0;
                            icon.visible = false;
                            icon.active = false;
                            return;
                        }
                    }
                    // If there is no x, add one
                    let icon = this.xGroup.getFirstDead();
                    icon.x = mask.x;
                    icon.y = mask.y;
                    icon.visible = true;
                    icon.active = true;
                } else if (pointer.button == 2) { // Right click assigns selected item to suspect
                    scene.sound.play('click_middle');
                    scene.sound.play('mask');
                    if (mask == this.mask1) {
                        suspect.change_mask(animals[0]);
                    } else if (mask == this.mask2) {
                        suspect.change_mask(animals[1]);
                    } else if (mask == this.mask3) {
                        suspect.change_mask(animals[2]);
                    } else if (mask == this.mask4) {
                        suspect.change_mask(animals[3]);
                    } else if (mask == this.mask5) {
                        suspect.change_mask(animals[4]);
                    }
                    this.close_panel(this.maskPanelX, this.maskPanel, this.maskPanelButton, this.maskOptions, 300, true);
                }
            });
        }

        this.maskPanelX = scene.add.sprite(x - 80, 300, 'x_grey').setInteractive({ useHandCursor: true })
            .on('pointerdown', () => { // Close panel
                scene.sound.play('click_exit');
                this.close_panel(this.maskPanelX, this.maskPanel, this.maskPanelButton, this.maskOptions, 300, true);
            });
        this.maskPanelX.visible = false;
        this.maskPanelButton = scene.add.sprite(x - 80, 300, 'circle').setScale(0.75).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => { // Open panel
                scene.sound.play('click_exit');
                this.open_panel(this.maskPanelX, this.maskPanel, this.maskPanelButton, this.maskOptions, 300);
            });    

        // --------- Item Panel --------- //
        this.itemPanel = scene.add.sprite(x, 220, 'panel_small');
        this.itemPanel.visible = false;

        // Panel options
        this.item1 = scene.add.sprite(x - 50, 220, 'items', items[0]+'.png').setScale(0.2).setInteractive({ useHandCursor: true });
        this.item2 = scene.add.sprite(x - 20, 220, 'items', items[1]+'.png').setScale(0.2).setInteractive({ useHandCursor: true });
        this.item3 = scene.add.sprite(x + 10, 220, 'items', items[2]+'.png').setScale(0.2).setInteractive({ useHandCursor: true });
        this.item4 = scene.add.sprite(x + 40, 220, 'items', items[3]+'.png').setScale(0.2).setInteractive({ useHandCursor: true });
        this.item5 = scene.add.sprite(x + 70, 220, 'items', items[4]+'.png').setScale(0.2).setInteractive({ useHandCursor: true });
        this.itemOptions = [
            this.item1, this.item2, this.item3,
            this.item4, this.item5
        ];
        for (let item of this.itemOptions) {
            item.visible = false;
            item.on('pointerdown', (pointer) => {
                if (pointer.button == 0) { // Left click adds an x
                    scene.sound.play('click_left');
                    for (let icon of this.xGroup.getChildren()) {
                        if (icon.x == item.x && icon.y == item.y) { // If there's already an x
                            icon.x = 0;
                            icon.y = 0;
                            icon.visible = false;
                            icon.active = false;
                            return;
                        }
                    }
                    // If there is no x, add one
                    let icon = this.xGroup.getFirstDead();
                    icon.x = item.x;
                    icon.y = item.y;
                    icon.visible = true;
                    icon.active = true;
                } else if (pointer.button == 2) { // Right click assigns selected item to suspect
                    scene.sound.play('click_middle');
                    scene.sound.play('item');
                    if (item == this.item1) {
                        suspect.change_item(items[0]);
                    } else if (item == this.item2) {
                        suspect.change_item(items[1]);
                    } else if (item == this.item3) {
                        suspect.change_item(items[2]);
                    } else if (item == this.item4) {
                        suspect.change_item(items[3]);
                    } else if (item == this.item5) {
                        suspect.change_item(items[4]);
                    }
                    this.close_panel(this.itemPanelX, this.itemPanel, this.itemPanelButton, this.itemOptions, 220, true);
                }
            });
        }

        this.itemPanelX = scene.add.sprite(x - 80, 220, 'x_grey').setInteractive({ useHandCursor: true })
            .on('pointerdown', () => { // Close panel
                scene.sound.play('click_exit');
                this.close_panel(this.itemPanelX, this.itemPanel, this.itemPanelButton, this.itemOptions, 220, true);
            });
        this.itemPanelX.visible = false;
        this.itemPanelButton = scene.add.sprite(x - 80, 220, 'circle').setScale(0.75).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => { // Open panel
                scene.sound.play('click_exit');
                this.open_panel(this.itemPanelX, this.itemPanel, this.itemPanelButton, this.itemOptions, 220);
            });

        // Xs
        this.xGroup = scene.add.group();
        this.xGroup.createMultiple({
            classType: Phaser.GameObjects.Sprite,
            key: 'x_black',
            setScale: { x: 1.5 },
            quantity: 15,
            active: false,
            visible: false
        });

        this.prevOpen = []; // Array to store previously open panels (to re-show after hidden)

        return this;
    }

    hide_buttons() {
        this.shirtPanelButton.visible = false;
        this.itemPanelButton.visible = false;
        this.maskPanelButton.visible = false;
    }

    show_buttons() {
        this.shirtPanelButton.visible = true;
        this.itemPanelButton.visible = true;
        this.maskPanelButton.visible = true;
    }

    close_panel(xIcon, panel, button, options, y, buttonVisible) {
        xIcon.visible = false;
        panel.visible = false;
        button.visible = buttonVisible;
        for (let option of options) {
            option.visible = false;
        }
        for (let icon of this.xGroup.getChildren()) {
            if (icon.y == y) { icon.visible = false; }
        }
    }

    open_panel(xIcon, panel, button, options, y) {
        xIcon.visible = true;
        panel.visible = true;
        button.visible = false;
        for (let option of options) {
            option.visible = true;
        }
        for (let icon of this.xGroup.getChildren()) {
            if (icon.y == y) { icon.visible = true; }
        }
    }
    
    close_all() {
        this.close_panel(this.shirtPanelX, this.shirtPanel, this.shirtPanelButton, this.colorOptions, 500, false);
        this.close_panel(this.maskPanelX, this.maskPanel, this.maskPanelButton, this.maskOptions, 300, false);
        this.close_panel(this.itemPanelX, this.itemPanel, this.itemPanelButton, this.itemOptions, 220, false);
    }

    hide_panel(xIcon, panel, button, options, y) {
        if (xIcon.visible == true) {
            this.prevOpen.push(xIcon);
            this.prevOpen.push(panel);
            xIcon.visible = false;
            panel.visible = false;
            for (let option of options) {
                this.prevOpen.push(option);
                option.visible = false;
            }
            for (let icon of this.xGroup.getChildren()) {
                if (icon.y == y) { 
                    this.prevOpen.push(icon);
                    icon.visible = false; 
                }
            }
        } else {
            this.prevOpen.push(button);
            button.visible = false;
        }
    }
    
    hide_all() {
        this.hide_panel(this.shirtPanelX, this.shirtPanel, this.shirtPanelButton, this.colorOptions, 500);
        this.hide_panel(this.maskPanelX, this.maskPanel, this.maskPanelButton, this.maskOptions, 300);
        this.hide_panel(this.itemPanelX, this.itemPanel, this.itemPanelButton, this.itemOptions, 200);
    }

    show_all() {
        for (let element of this.prevOpen) {
            element.visible = true;
        }
        this.prevOpen = []; // Empty the previosuly open array
    }
}