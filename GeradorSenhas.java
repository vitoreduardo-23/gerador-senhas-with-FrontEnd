import java.security.SecureRandom; // Gerador mais seguro para senhas
import java.util.Scanner; // Entrada de dados do usuário

public class GeradorSenhas {
    public static void main(String[] args)
{

//=================================================
// 1. Entrada do Usuário
//=================================================

Scanner scanner = new Scanner(System.in);
System.out.print("Digite o tamanho da senha (mínimo 8 caracteres): ");
int tamanhoSenha = scanner.nextInt();

// Validação: senha precisa ter pelo menos 8 caracteres
if (tamanhoSenha < 8) {
    System.out.println("O tamanho da senha deve ter no mínimo 8 caracteres.");
    scanner.close();
    return; // Encerra o programa
}

//=================================================
// 2. Definição dos Caracteres Permitidos
//=================================================

String letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
String letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
String numeros = "0123456789";
String caracteresEspeciais = "!@#$%&*()-_=+";

String todosCaracteres = letrasMaiusculas + letrasMinusculas + numeros + caracteresEspeciais;

//=================================================
// 3. Gerador Seguro
//=================================================

SecureRandom random = new SecureRandom();

//=================================================
// 4. Garantindo a segurança mínima
//=================================================

// Uso do StringBuilder para melhor performance
StringBuilder senha = new StringBuilder();

// Garantir que a senha tenha pelo menos um caractere de cada tipo
senha.append(letrasMaiusculas.charAt(random.nextInt(letrasMaiusculas.length())));
senha.append(letrasMinusculas.charAt(random.nextInt(letrasMinusculas.length())));
senha.append(numeros.charAt(random.nextInt(numeros.length())));
senha.append(caracteresEspeciais.charAt(random.nextInt(caracteresEspeciais.length())));

//=================================================
// 5. Completando a senha com caracteres aleatórios
//=================================================

for (int i = 4; i < tamanhoSenha; i++) {
    int indiceAleatorio = random.nextInt(todosCaracteres.length());
    senha.append(todosCaracteres.charAt(indiceAleatorio));
}

//=================================================
// 6. Embaralhando a senha para evitar padrões
//=================================================

// Para não ficar previsível (ex: sempre começar com A, a 1, !), vamos embaralhar os caracteres
char[] senhaArray = senha.toString().toCharArray();

for (int i = 0; i < senhaArray.length; i++) {
    
    int indiceAleatorio = random.nextInt(senhaArray.length);

    // Troca os caracteres de posição
    char temp = senhaArray[i];
    senhaArray[i] = senhaArray[indiceAleatorio];
    senhaArray[indiceAleatorio] = temp;
}

String senhaFinal = new String(senhaArray);

//=================================================
// 7. Exibir a senha gerada
//=================================================

System.out.println("Senha forte gerada: " + senhaFinal);

//=================================================
// 8. Fechar o scanner
//=================================================

scanner.close();
}
}