<?php
    include_once '../../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

        if ( isset( $_FILES['pdfFile'] ) ) {
            if ($_FILES['pdfFile']['type'] == "application/pdf") {
                $source_file = $_FILES['pdfFile']['tmp_name'];
                $dest_file = "controldecambios/"."1528_".$_FILES['pdfFile']['name'];


                if (file_exists($dest_file)) {
                    print "The file name already exists!!";
                }
                else {
                    move_uploaded_file( $source_file, $dest_file )
                    or die ("Error!!");
                    if($_FILES['pdfFile']['error'] == 0) {
                        print "Pdf file uploaded successfully!";
                        print "<b><u>Details : </u></b><br/>";
                        print "File Name : ".$_FILES['pdfFile']['name']."<br.>"."<br/>";
                        print "File Size : ".$_FILES['pdfFile']['size']." bytes"."<br/>";
                        print "File location : controldecambios/".$_FILES['pdfFile']['name']."<br/>";
                    }
                }
            }
            else {
                if ( $_FILES['pdfFile']['type'] != "application/pdf") {
                    print "Error occured while uploading file : ".$_FILES['pdfFile']['name']."<br/>";
                    print "Invalid  file extension, should be pdf !!"."<br/>";
                    print "Error Code : ".$_FILES['pdfFile']['error']."<br/>";
                }
            }
            $file = date("dmYhis") . basename($_FILES["pdfFile"]["name"]);
            $location = "controldecambios/"."1528_". $file;
            $sqli = "INSERT INTO `controlCambios` (`rutaControl`) VALUES ('{$location}')";
            $result = mysqli_query($con,$sqli);
            if ($result) {
                $message = "El archivo ha sido cargado correctamente";
                echo "<script type='text/javascript'>alert('$message');</script>";
            };
        }
?>
